// components/Test/ResultsScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  Dimensions
} from 'react-native';
import { t } from '../../utils/languages';

const { width } = Dimensions.get('window');

const ResultsScreen = ({ 
  results, 
  onRetakeTest, 
  onViewDetails,
  userLanguage = 'he' 
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const getStrengthColor = (score) => {
    if (score >= 0.8) return '#4caf50';
    if (score >= 0.6) return '#8bc34a';
    if (score >= 0.4) return '#ffeb3b';
    return '#ff9800';
  };

  const getStrengthEmoji = (score) => {
    if (score >= 0.8) return '🎯';
    if (score >= 0.6) return '👍';
    if (score >= 0.4) return '💪';
    return '🌱';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.celebrateEmoji}>🎉</Text>
          <Text style={styles.title}>{t('testComplete', userLanguage)}</Text>
          <Text style={styles.subtitle}>{t('discoverYourPotential', userLanguage)}</Text>
        </View>

        {/* Score Card */}
        <View style={styles.scoreCard}>
          <Text style={styles.scoreTitle}>{t('yourResults', userLanguage)}</Text>
          <View style={styles.scoreCircle}>
            <Text style={styles.scorePercentage}>
              {Math.round(results.overallScore * 100)}%
            </Text>
            <Text style={styles.scoreLabel}>{t('potentialMatch', userLanguage)}</Text>
          </View>
        </View>

        {/* Top Strengths */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌟 {t('topStrengths', userLanguage)}</Text>
          {results.topStrengths.map((strength, index) => (
            <View key={index} style={styles.strengthItem}>
              <View style={styles.strengthHeader}>
                <Text style={styles.strengthName}>{strength.subject}</Text>
                <View style={styles.strengthScore}>
                  <Text style={styles.strengthPercentage}>
                    {Math.round(strength.score * 100)}%
                  </Text>
                  <Text style={styles.strengthEmoji}>
                    {getStrengthEmoji(strength.score)}
                  </Text>
                </View>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { 
                      width: `${strength.score * 100}%`,
                      backgroundColor: getStrengthColor(strength.score)
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>

        {/* Career Suggestions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💼 {t('careerSuggestions', userLanguage)}</Text>
          {results.careerSuggestions.map((career, index) => (
            <TouchableOpacity key={index} style={styles.careerCard}>
              <View style={styles.careerEmoji}>
                <Text style={styles.careerEmojiText}>{career.emoji}</Text>
              </View>
              <View style={styles.careerInfo}>
                <Text style={styles.careerTitle}>{career.title}</Text>
                <Text style={styles.careerDescription}>{career.description}</Text>
                <View style={styles.careerTags}>
                  {career.tags.map((tag, tagIndex) => (
                    <View key={tagIndex} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.detailsButton}
            onPress={onViewDetails}
          >
            <Text style={styles.detailsButtonText}>
              {t('viewDetailedReport', userLanguage)} 📊
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.retakeButton}
            onPress={onRetakeTest}
          >
            <Text style={styles.retakeButtonText}>
              {t('retakeTest', userLanguage)} 🔄
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fff8',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  celebrateEmoji: {
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
  },
  scoreCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  scoreTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 16,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    borderColor: '#e8f5e8',
  },
  scorePercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  scoreLabel: {
    fontSize: 12,
    color: 'white',
    marginTop: 4,
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 16,
  },
  strengthItem: {
    marginBottom: 16,
  },
  strengthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  strengthName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  strengthScore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  strengthPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4caf50',
    marginRight: 8,
  },
  strengthEmoji: {
    fontSize: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  careerCard: {
    flexDirection: 'row',
    backgroundColor: '#f8fff8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  careerEmoji: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  careerEmojiText: {
    fontSize: 18,
  },
  careerInfo: {
    flex: 1,
  },
  careerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 4,
  },
  careerDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },
  careerTags: {
    flexDirection: 'row',
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
  },
  actions: {
    marginTop: 24,
    gap: 12,
  },
  detailsButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  retakeButton: {
    backgroundColor: '#e8f5e8',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4caf50',
  },
  retakeButtonText: {
    color: '#2e7d32',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ResultsScreen;
