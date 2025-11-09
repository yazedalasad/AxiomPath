// services/TestEngine.js
import { supabase } from '../config/supabase';
import { t } from '../utils/languages';

class TestEngine {
  constructor(userLanguage = 'he') {
    this.supabase = supabase;
    this.userLanguage = userLanguage;
  }

  // Set user language preference
  setLanguage(languageCode) {
    this.userLanguage = languageCode;
  }

  // Start a new test session
  async startTest(userId) {
    console.log('🚀', t('startingTest', this.userLanguage));
    
    try {
      const { data: session, error } = await this.supabase
        .from('test_sessions')
        .insert({
          user_id: userId,
          status: 'active',
          day_number: 1,
          progress_data: {
            subjects_tested: [],
            ability_scores: {},
            interest_scores: {},
            questions_answered: 0,
            preferred_language: this.userLanguage,
            current_strengths: [],
            learning_patterns: {}
          }
        })
        .select()
        .single();

      if (error) {
        console.error('❌', t('errorStartingTest', this.userLanguage), error);
        return { error };
      }

      console.log('✅', t('testSessionCreated', this.userLanguage), session.id);
      return { session };
    } catch (error) {
      console.error('❌', t('errorStartingTest', this.userLanguage), error);
      return { error };
    }
  }

  // Get a random question with language support
  async getRandomQuestion() {
    console.log('🎯', t('gettingQuestion', this.userLanguage));
    
    try {
      const { data: question, error } = await this.supabase
        .from('questions')
        .select(`
          *,
          question_options (*),
          subjects (name_en, name_he, name_ar)
        `)
        .order('random()')
        .limit(1)
        .single();

      if (error) {
        console.error('❌', t('errorGettingQuestion', this.userLanguage), error);
        return { error };
      }

      // Add translated text to question object
      const translatedQuestion = {
        ...question,
        display_text: this.getQuestionText(question),
        display_explanation: this.getExplanationText(question),
        display_options: question.question_options.map(option => ({
          ...option,
          display_text: this.getOptionText(option)
        }))
      };

      console.log('✅', t('questionLoaded', this.userLanguage), question.id);
      return { question: translatedQuestion };
    } catch (error) {
      console.error('❌', t('errorGettingQuestion', this.userLanguage), error);
      return { error };
    }
  }

  // Get question text in user's language
  getQuestionText(question) {
    const langKey = `question_text_${this.userLanguage}`;
    return question[langKey] || question.question_text_en || question.question_text;
  }

  // Get option text in user's language
  getOptionText(option) {
    const langKey = `option_text_${this.userLanguage}`;
    return option[langKey] || option.option_text_en || option.option_text;
  }

  // Get explanation text in user's language
  getExplanationText(question) {
    const langKey = `explanation_text_${this.userLanguage}`;
    return question[langKey] || question.explanation_text_en || question.explanation_text;
  }

  // Submit an answer with comprehensive data collection
  async submitAnswer(sessionId, questionId, optionId, answerData) {
    console.log('📝', t('submittingAnswer', this.userLanguage));
    
    try {
      // Get the selected option to check if it's correct
      const { data: selectedOption, error: optionError } = await this.supabase
        .from('question_options')
        .select('is_correct, points_value')
        .eq('id', optionId)
        .single();

      if (optionError) {
        console.error('❌ Error getting option:', optionError);
        return { error: optionError };
      }

      const { data: answer, error } = await this.supabase
        .from('student_answers')
        .insert({
          session_id: sessionId,
          question_id: questionId,
          selected_option_id: optionId,
          time_spent_ms: answerData.timeSpent * 1000, // Convert to milliseconds
          used_hint: answerData.usedHint || false,
          confidence_level: answerData.confidenceLevel || 3,
          chose_dont_know: answerData.choseDontKnow || false,
          user_language: this.userLanguage,
          is_correct: selectedOption.is_correct,
          points_earned: selectedOption.points_value
        })
        .select()
        .single();

      if (error) {
        console.error('❌', t('errorSubmittingAnswer', this.userLanguage), error);
        return { error };
      }

      // Update session progress
      await this.updateSessionProgress(sessionId, questionId, selectedOption.is_correct, answerData);

      console.log('✅', t('answerSubmitted', this.userLanguage), answer.id);
      
      // Generate feedback message
      const feedback = this.generateFeedback(answerData, selectedOption.is_correct);
      
      return { answer, feedback, isCorrect: selectedOption.is_correct };
    } catch (error) {
      console.error('❌', t('errorSubmittingAnswer', this.userLanguage), error);
      return { error };
    }
  }

  // Update session progress data
  async updateSessionProgress(sessionId, questionId, isCorrect, answerData) {
    try {
      // Get current session data
      const { data: session, error } = await this.supabase
        .from('test_sessions')
        .select('progress_data')
        .eq('id', sessionId)
        .single();

      if (error) throw error;

      const progress = session.progress_data;
      
      // Update basic metrics
      progress.questions_answered = (progress.questions_answered || 0) + 1;
      
      // Update performance metrics
      if (!progress.performance) {
        progress.performance = {
          total_answered: 0,
          correct_answers: 0,
          average_time: 0,
          total_time: 0
        };
      }
      
      progress.performance.total_answered += 1;
      if (isCorrect) {
        progress.performance.correct_answers += 1;
      }
      progress.performance.total_time += answerData.timeSpent;
      progress.performance.average_time = progress.performance.total_time / progress.performance.total_answered;

      // Update session
      await this.supabase
        .from('test_sessions')
        .update({ 
          progress_data: progress,
          updated_at: new Date().toISOString()
        })
        .eq('id', sessionId);

    } catch (error) {
      console.error('❌ Error updating session progress:', error);
    }
  }

  // Generate feedback in user's language
  generateFeedback(answerData, isCorrect) {
    if (isCorrect) {
      if (answerData.timeSpent < 10) {
        return t('quickAndCorrect', this.userLanguage);
      } else if (answerData.timeSpent < 30) {
        return t('correctAnswer', this.userLanguage);
      } else {
        return t('thoughtfulCorrect', this.userLanguage);
      }
    } else {
      if (answerData.choseDontKnow) {
        return t('admitDontKnow', this.userLanguage);
      } else {
        return t('incorrectTryAgain', this.userLanguage);
      }
    }
  }

  // Complete test session
  async completeTest(sessionId) {
    try {
      const { data: session, error } = await this.supabase
        .from('test_sessions')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('id', sessionId)
        .select()
        .single();

      if (error) throw error;

      return { session };
    } catch (error) {
      console.error('❌ Error completing test:', error);
      return { error };
    }
  }

  // Get test session by ID
  async getSession(sessionId) {
    try {
      const { data: session, error } = await this.supabase
        .from('test_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (error) throw error;

      return { session };
    } catch (error) {
      console.error('❌ Error getting session:', error);
      return { error };
    }
  }

  // Generate sample results for demonstration
  generateSampleResults(questionsAnswered = 10) {
    const performanceScore = Math.min(0.7 + (Math.random() * 0.3), 0.95);
    
    return {
      overallScore: performanceScore,
      questionsAnswered: questionsAnswered,
      averageTime: 25, // seconds
      accuracy: Math.round(performanceScore * 100),
      topStrengths: [
        { 
          subject: 'Mathematics', 
          score: 0.85,
          emoji: '🧮',
          description: 'Strong analytical and problem-solving skills'
        },
        { 
          subject: 'Physics', 
          score: 0.78,
          emoji: '⚡',
          description: 'Good understanding of scientific principles'
        },
        { 
          subject: 'Computer Science', 
          score: 0.72,
          emoji: '💻',
          description: 'Logical thinking and technical aptitude'
        }
      ],
      careerSuggestions: [
        {
          title: 'Software Engineer',
          description: 'Develop innovative software solutions and applications',
          emoji: '👨‍💻',
          tags: ['Technology', 'Problem Solving', 'Innovation', 'Programming'],
          match: 92,
          salary: '₪25,000-₪45,000',
          education: 'Computer Science Degree',
          companies: ['Wix', 'CheckPoint', 'Mobileye', 'Google Israel']
        },
        {
          title: 'Data Scientist',
          description: 'Analyze complex data patterns and build predictive models',
          emoji: '📊',
          tags: ['Analytics', 'Mathematics', 'Research', 'AI'],
          match: 88,
          salary: '₪22,000-₪40,000',
          education: 'Mathematics/Statistics Degree',
          companies: ['Intel', 'IBM', 'Startups', 'Research Institutes']
        },
        {
          title: 'Engineering',
          description: 'Design and build technological systems and infrastructure',
          emoji: '⚙️',
          tags: ['Design', 'Physics', 'Mathematics', 'Innovation'],
          match: 85,
          salary: '₪20,000-₪38,000',
          education: 'Engineering Degree',
          companies: ['Rafael', 'Elbit', 'IAI', 'Intel']
        }
      ],
      learningRecommendations: [
        {
          area: 'Advanced Mathematics',
          priority: 'high',
          resources: ['Khan Academy', 'Coursera Math Courses', 'University Prep']
        },
        {
          area: 'Programming Skills',
          priority: 'medium',
          resources: ['Python Course', 'Web Development', 'Algorithm Practice']
        },
        {
          area: 'Scientific Research',
          priority: 'medium',
          resources: ['Science Projects', 'Research Methods', 'Lab Skills']
        }
      ]
    };
  }

  // Get test instructions in user's language
  getTestInstructions() {
    return {
      title: t('smartTest', this.userLanguage),
      description: t('testDescription', this.userLanguage),
      instructions: [
        t('instruction1', this.userLanguage),
        t('instruction2', this.userLanguage),
        t('instruction3', this.userLanguage),
        t('instruction4', this.userLanguage)
      ],
      buttonStart: t('startJourney', this.userLanguage),
      buttonNext: t('nextQuestion', this.userLanguage),
      buttonSubmit: t('submitAnswer', this.userLanguage)
    };
  }
}

export default TestEngine;