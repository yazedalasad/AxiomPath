// components/Test/QuestionDisplay.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView
} from 'react-native';
import { t } from '../../utils/languages';
import ProgressTracker from './ProgressTracker';
import LearningModule from './LearningModule';

const { width } = Dimensions.get('window');

const QuestionDisplay = ({ 
  question, 
  onAnswer, 
  userLanguage = 'he',
  questionNumber,
  totalQuestions = 10
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showLearningModule, setShowLearningModule] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);

  // Timer effect
  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  // Animation effect
  useEffect(() => {
    setTimer(0);
    setTimerRunning(true);
    setSelectedOption(null);
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, [question]);

  const getQuestionText = () => {
    const langKey = `question_text_${userLanguage}`;
    return question[langKey] || question.question_text_en;
  };

  const getOptionText = (option) => {
    const langKey = `option_text_${userLanguage}`;
    return option[langKey] || option.option_text_en;
  };

  const getSubjectName = () => {
    if (!question.subjects) return 'Mathematics';
    const langKey = `name_${userLanguage}`;
    return question.subjects[langKey] || question.subjects.name_en;
  };

  const handleAnswer = () => {
    if (!selectedOption) return;
    
    setTimerRunning(false);
    onAnswer(selectedOption, timer);
  };

  const handleLearnMore = () => {
    setShowLearningModule(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={styles.container}>
      {/* Progress Tracker */}
      <ProgressTracker 
        currentQuestion={questionNumber}
        totalQuestions={totalQuestions}
        userLanguage={userLanguage}
        subject={getSubjectName()}
      />

      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        {/* Question Header */}
        <View style={styles.questionHeader}>
          <View style={styles.timer}>
            <Text style={styles.timerText}>⏱️ {formatTime(timer)}</Text>
          </View>
          <View style={styles.difficulty}>
            <Text style={styles.difficultyText}>
              {t('difficulty', userLanguage)}: {'⭐'.repeat(question.difficulty)}
            </Text>
          </View>
        </View>

        {/* Question Card */}
        <View style={styles.questionCard}>
          <Text style={styles.subject}>
            {getSubjectName()}
          </Text>
          <Text style={styles.questionText}>
            {getQuestionText()}
          </Text>
          
          {question.real_world_context && (
            <View style={styles.contextBubble}>
              <Text style={styles.contextEmoji}>🌍</Text>
              <Text style={styles.contextText}>
                {question.real_world_context}
              </Text>
            </View>
          )}
        </View>

        {/* Options */}
        <ScrollView style={styles.optionsContainer} showsVerticalScrollIndicator={false}>
          {question.question_options.map((option, index) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                selectedOption?.id === option.id && styles.optionCardSelected
              ]}
              onPress={() => setSelectedOption(option)}
            >
              <View style={styles.optionHeader}>
                <View style={[
                  styles.optionIndicator,
                  selectedOption?.id === option.id && styles.optionIndicatorSelected
                ]}>
                  <Text style={[
                    styles.optionLetter,
                    selectedOption?.id === option.id && styles.optionLetterSelected
                  ]}>
                    {String.fromCharCode(65 + index)}
                  </Text>
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionText}>
                    {getOptionText(option)}
                  </Text>
                </View>
              </View>
              
              {/* Option Hints */}
              {option.interest_tags && option.interest_tags.length > 0 && (
                <View style={styles.tagsContainer}>
                  {option.interest_tags.slice(0, 2).map((tag, tagIndex) => (
                    <View key={tagIndex} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickAction}
            onPress={() => setSelectedOption(null)}
          >
            <Text style={styles.quickActionText}>🔄 {t('clearSelection', userLanguage)}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickAction}
            onPress={handleLearnMore}
          >
            <Text style={styles.quickActionText}>🤔 {t('notSure', userLanguage)}</Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={handleLearnMore}
          >
            <Text style={styles.secondaryButtonText}>
              {t('learnMore', userLanguage)} 📚
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.primaryButton,
              !selectedOption && styles.primaryButtonDisabled
            ]}
            onPress={handleAnswer}
            disabled={!selectedOption}
          >
            <Text style={styles.primaryButtonText}>
              {t('submitAnswer', userLanguage)} {selectedOption ? '✅' : '⏳'}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Learning Module */}
      {showLearningModule && (
        <LearningModule
          question={question}
          onClose={() => setShowLearningModule(false)}
          onContinue={() => setShowLearningModule(false)}
          userLanguage={userLanguage}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fff8',
    padding: 16,
  },
  content: {
    flex: 1,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  timer: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  timerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976d2',
  },
  difficulty: {
    backgroundColor: '#ffeb3b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#ff9800',
    fontWeight: '600',
    fontSize: 12,
  },
  questionCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderLeftWidth: 6,
    borderLeftColor: '#4caf50',
  },
  subject: {
    fontSize: 14,
    color: '#66bb6a',
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 22,
    color: '#2e7d32',
    fontWeight: '600',
    lineHeight: 30,
    textAlign: 'center',
    marginBottom: 16,
  },
  contextBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  contextEmoji: {
    fontSize: 16,
    marginRight: 8,
  },
  contextText: {
    fontSize: 14,
    color: '#1976d2',
    flex: 1,
    lineHeight: 18,
  },
  optionsContainer: {
    flex: 1,
    marginBottom: 16,
  },
  optionCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e0f2e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  optionCardSelected: {
    borderColor: '#4caf50',
    backgroundColor: '#f1f8e9',
    transform: [{ scale: 1.02 }],
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionIndicatorSelected: {
    backgroundColor: '#4caf50',
  },
  optionLetter: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  optionLetterSelected: {
    color: 'white',
  },
  optionTextContainer: {
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#4caf50',
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  quickAction: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  quickActionText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#e8f5e8',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4caf50',
  },
  secondaryButtonText: {
    color: '#2e7d32',
    fontWeight: '600',
    fontSize: 16,
  },
  primaryButton: {
    flex: 2,
    backgroundColor: '#4caf50',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#4caf50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonDisabled: {
    backgroundColor: '#c8e6c9',
    shadowOpacity: 0,
    elevation: 0,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default QuestionDisplay;