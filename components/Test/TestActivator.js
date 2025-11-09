// components/Test/TestActivator.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Animated,
  Dimensions,
  SafeAreaView,
  Alert
} from 'react-native';
import TestEngine from '../services/TestEngine';
import { t, getTextDirection } from '../../utils/languages';
import QuestionDisplay from './QuestionDisplay';
import ResultsScreen from './ResultsScreen';

const { width, height } = Dimensions.get('window');

const TestActivator = ({ userLanguage = 'he', userId = 'demo-user-123' }) => {
  // State management
  const [currentSession, setCurrentSession] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentStep, setCurrentStep] = useState('welcome'); // welcome, question, results, loading
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [testResults, setTestResults] = useState(null);
  const [testEngine] = useState(new TestEngine(userLanguage));
  const [feedback, setFeedback] = useState('');
  
  // Animations
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [scaleAnim] = useState(new Animated.Value(0.9));
  
  const textDirection = getTextDirection(userLanguage);
  const TOTAL_QUESTIONS = 10; // Demo: show results after 10 questions

  // Animation effects
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, [currentStep]);

  // Start a new test session
  const startTest = async () => {
    setCurrentStep('loading');
    setFeedback('');
    
    try {
      const { session, error } = await testEngine.startTest(userId);
      
      if (error) {
        Alert.alert(t('error', userLanguage), t('errorStartingTest', userLanguage));
        setCurrentStep('welcome');
        return;
      }
      
      setCurrentSession(session);
      await loadNextQuestion();
    } catch (error) {
      console.error('Error starting test:', error);
      Alert.alert(t('error', userLanguage), t('errorStartingTest', userLanguage));
      setCurrentStep('welcome');
    }
  };

  // Load the next question
  const loadNextQuestion = async () => {
    try {
      const { question, error } = await testEngine.getRandomQuestion();
      
      if (error) {
        Alert.alert(t('error', userLanguage), t('errorGettingQuestion', userLanguage));
        return;
      }
      
      // For demo: show results after specified number of questions
      if (questionsAnswered >= TOTAL_QUESTIONS - 1) {
        await completeTest();
        return;
      }
      
      setCurrentQuestion(question);
      setCurrentStep('question');
    } catch (error) {
      console.error('Error loading question:', error);
      Alert.alert(t('error', userLanguage), t('errorGettingQuestion', userLanguage));
    }
  };

  // Handle answer submission
  const handleAnswer = async (selectedOption, timeSpent) => {
    setCurrentStep('loading');
    
    try {
      const answerData = {
        timeSpent: timeSpent,
        confidenceLevel: 4,
        choseDontKnow: false
      };

      const { answer, feedback: answerFeedback, error } = await testEngine.submitAnswer(
        currentSession.id,
        currentQuestion.id,
        selectedOption.id,
        answerData
      );

      if (error) {
        throw error;
      }

      setFeedback(answerFeedback);
      setQuestionsAnswered(prev => prev + 1);
      
      // Show feedback briefly before next question
      setTimeout(loadNextQuestion, 1500);
    } catch (error) {
      console.error('Error submitting answer:', error);
      Alert.alert(t('error', userLanguage), t('errorSubmittingAnswer', userLanguage));
      setCurrentStep('question');
    }
  };

  // Complete the test and show results
  const completeTest = async () => {
    try {
      if (currentSession) {
        await testEngine.completeTest(currentSession.id);
      }
      
      // Generate sample results (in real app, this would be calculated from actual data)
      const results = testEngine.generateSampleResults(questionsAnswered + 1);
      setTestResults(results);
      setCurrentStep('results');
      
    } catch (error) {
      console.error('Error completing test:', error);
      // Still show results even if completion fails
      const results = testEngine.generateSampleResults(questionsAnswered + 1);
      setTestResults(results);
      setCurrentStep('results');
    }
  };

  // Restart the test
  const handleRetakeTest = () => {
    setCurrentStep('welcome');
    setQuestionsAnswered(0);
    setTestResults(null);
    setCurrentQuestion(null);
    setCurrentSession(null);
    setFeedback('');
  };

  // Handle viewing detailed report
  const handleViewDetails = () => {
    Alert.alert(
      t('detailedReport', userLanguage),
      t('detailedReportMessage', userLanguage),
      [{ text: t('ok', userLanguage) }]
    );
  };

  // Render welcome screen
  const renderWelcomeScreen = () => (
    <Animated.View 
      style={[
        styles.screen,
        {
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { scale: scaleAnim }
          ]
        }
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.emoji}>🎯</Text>
        <Text style={styles.title}>{t('smartTest', userLanguage)}</Text>
        <Text style={styles.subtitle}>{t('testDescription', userLanguage)}</Text>
      </View>

      <View style={styles.features}>
        <View style={styles.featureItem}>
          <Text style={styles.featureEmoji}>🌟</Text>
          <View style={styles.featureTextContainer}>
            <Text style={styles.featureTitle}>{t('discoverStrengths', userLanguage)}</Text>
            <Text style={styles.featureDescription}>{t('discoverStrengthsDesc', userLanguage)}</Text>
          </View>
        </View>
        
        <View style={styles.featureItem}>
          <Text style={styles.featureEmoji}>🎨</Text>
          <View style={styles.featureTextContainer}>
            <Text style={styles.featureTitle}>{t('findPassions', userLanguage)}</Text>
            <Text style={styles.featureDescription}>{t('findPassionsDesc', userLanguage)}</Text>
          </View>
        </View>
        
        <View style={styles.featureItem}>
          <Text style={styles.featureEmoji}>🚀</Text>
          <View style={styles.featureTextContainer}>
            <Text style={styles.featureTitle}>{t('careerGuidance', userLanguage)}</Text>
            <Text style={styles.featureDescription}>{t('careerGuidanceDesc', userLanguage)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionsTitle}>📋 {t('howItWorks', userLanguage)}</Text>
        <View style={styles.instructionList}>
          <Text style={styles.instruction}>• {t('instruction1', userLanguage)}</Text>
          <Text style={styles.instruction}>• {t('instruction2', userLanguage)}</Text>
          <Text style={styles.instruction}>• {t('instruction3', userLanguage)}</Text>
          <Text style={styles.instruction}>• {t('instruction4', userLanguage)}</Text>
        </View>
      </View>

      <View style={styles.testInfo}>
        <Text style={styles.testInfoText}>
          ⏱️ {TOTAL_QUESTIONS} {t('questions', userLanguage)} • 🕒 {t('approxTime', userLanguage)}
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.startButton}
        onPress={startTest}
      >
        <Text style={styles.startButtonText}>
          {t('startJourney', userLanguage)} ✨
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  // Render question screen
  const renderQuestionScreen = () => (
    <QuestionDisplay
      question={currentQuestion}
      onAnswer={handleAnswer}
      userLanguage={userLanguage}
      questionNumber={questionsAnswered + 1}
      totalQuestions={TOTAL_QUESTIONS}
    />
  );

  // Render results screen
  const renderResultsScreen = () => (
    <ResultsScreen
      results={testResults}
      onRetakeTest={handleRetakeTest}
      onViewDetails={handleViewDetails}
      userLanguage={userLanguage}
    />
  );

  // Render loading screen
  const renderLoadingScreen = () => (
    <View style={styles.screen}>
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingEmoji}>
          {currentStep === 'loading' && feedback ? '💫' : '⏳'}
        </Text>
        
        {feedback ? (
          <>
            <Text style={styles.feedbackText}>{feedback}</Text>
            <Text style={styles.loadingText}>
              {t('loadingNextQuestion', userLanguage)}
            </Text>
          </>
        ) : (
          <Text style={styles.loadingText}>
            {currentStep === 'loading' ? t('loadingQuestion', userLanguage) : t('preparingTest', userLanguage)}
          </Text>
        )}
        
        <View style={styles.loadingDots}>
          <Animated.View style={[styles.dot, { opacity: fadeAnim }]} />
          <Animated.View style={[styles.dot, { opacity: fadeAnim }]} />
          <Animated.View style={[styles.dot, { opacity: fadeAnim }]} />
        </View>
        
        {questionsAnswered > 0 && (
          <Text style={styles.progressText}>
            {questionsAnswered} {t('of', userLanguage)} {TOTAL_QUESTIONS} {t('questionsCompleted', userLanguage)}
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { direction: textDirection }]}>
      {currentStep === 'welcome' && renderWelcomeScreen()}
      {currentStep === 'question' && renderQuestionScreen()}
      {currentStep === 'results' && renderResultsScreen()}
      {currentStep === 'loading' && renderLoadingScreen()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fff8',
  },
  screen: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#4caf50',
    textAlign: 'center',
    lineHeight: 24,
  },
  features: {
    marginVertical: 30,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featureEmoji: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 2,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    color: '#2e7d32',
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  instructions: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 12,
  },
  instructionList: {
    gap: 6,
  },
  instruction: {
    fontSize: 14,
    color: '#4caf50',
    lineHeight: 20,
  },
  testInfo: {
    backgroundColor: '#e8f5e8',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  testInfoText: {
    fontSize: 14,
    color: '#2e7d32',
    fontWeight: '500',
  },
  startButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#4caf50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingEmoji: {
    fontSize: 48,
    marginBottom: 24,
  },
  feedbackText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4caf50',
    textAlign: 'center',
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 18,
    color: '#4caf50',
    textAlign: 'center',
    marginBottom: 24,
  },
  loadingDots: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4caf50',
    marginHorizontal: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default TestActivator;