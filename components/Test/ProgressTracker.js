// components/Test/ProgressTracker.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { t } from '../../utils/languages';

const ProgressTracker = ({ 
  currentQuestion, 
  totalQuestions = 10, 
  userLanguage = 'he',
  subject 
}) => {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressHeader}>
        <Text style={styles.progressText}>
          {t('question', userLanguage)} {currentQuestion} {t('of', userLanguage)} {totalQuestions}
        </Text>
        <Text style={styles.progressPercentage}>
          {Math.round(progress)}%
        </Text>
      </View>
      
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill,
            { width: `${progress}%` }
          ]} 
        />
      </View>

      {/* Subject Indicator */}
      {subject && (
        <View style={styles.subjectContainer}>
          <View style={styles.subjectDot} />
          <Text style={styles.subjectText}>
            {subject}
          </Text>
        </View>
      )}

      {/* Motivational Message */}
      <View style={styles.motivationContainer}>
        <Text style={styles.motivationEmoji}>
          {getMotivationEmoji(currentQuestion, totalQuestions)}
        </Text>
        <Text style={styles.motivationText}>
          {getMotivationMessage(currentQuestion, totalQuestions, userLanguage)}
        </Text>
      </View>
    </View>
  );
};

const getMotivationEmoji = (current, total) => {
  const progress = current / total;
  if (progress < 0.3) return '🚀';
  if (progress < 0.6) return '💪';
  if (progress < 0.9) return '🎯';
  return '🔥';
};

const getMotivationMessage = (current, total, language) => {
  const progress = current / total;
  if (progress < 0.3) return t('greatStart', language);
  if (progress < 0.6) return t('keepGoing', language);
  if (progress < 0.9) return t('almostThere', language);
  return t('finalPush', language);
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4caf50',
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0f2e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 4,
  },
  subjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  subjectDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff9800',
    marginRight: 8,
  },
  subjectText: {
    fontSize: 12,
    color: '#ff9800',
    fontWeight: '500',
  },
  motivationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f8e9',
    padding: 12,
    borderRadius: 12,
  },
  motivationEmoji: {
    fontSize: 16,
    marginRight: 8,
  },
  motivationText: {
    fontSize: 12,
    color: '#388e3c',
    fontWeight: '500',
    flex: 1,
  },
});

export default ProgressTracker;
