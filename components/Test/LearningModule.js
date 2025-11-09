// components/Test/LearningModule.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView
} from 'react-native';
import { t } from '../../utils/languages';

const LearningModule = ({ 
  question, 
  onClose, 
  onContinue,
  userLanguage = 'he' 
}) => {
  const [slideAnim] = useState(new Animated.Value(300));

  React.useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const getExplanationText = () => {
    const langKey = `explanation_text_${userLanguage}`;
    return question[langKey] || question.explanation_text_en;
  };

  const getRealWorldContext = () => {
    const langKey = `real_world_context_${userLanguage}`;
    return question[langKey] || question.real_world_context_en;
  };

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  return (
    <View style={styles.overlay}>
      <Animated.View 
        style={[
          styles.container,
          { transform: [{ translateY: slideAnim }] }
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>💡 {t('learningTime', userLanguage)}</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Explanation */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t('explanation', userLanguage)}
            </Text>
            <Text style={styles.sectionText}>
              {getExplanationText()}
            </Text>
          </View>

          {/* Real World Application */}
          {getRealWorldContext() && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                🌍 {t('realWorldApplication', userLanguage)}
              </Text>
              <Text style={styles.sectionText}>
                {getRealWorldContext()}
              </Text>
            </View>
          )}

          {/* Career Connections */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              💼 {t('careerConnections', userLanguage)}
            </Text>
            <View style={styles.careerList}>
              <View style={styles.careerItem}>
                <Text style={styles.careerEmoji}>🔬</Text>
                <Text style={styles.careerText}>
                  {t('researchScience', userLanguage)}
                </Text>
              </View>
              <View style={styles.careerItem}>
                <Text style={styles.careerEmoji}>💻</Text>
                <Text style={styles.careerText}>
                  {t('technology', userLanguage)}
                </Text>
              </View>
              <View style={styles.careerItem}>
                <Text style={styles.careerEmoji}>📊</Text>
                <Text style={styles.careerText}>
                  {t('dataAnalysis', userLanguage)}
                </Text>
              </View>
            </View>
          </View>

          {/* Tips */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              💪 {t('learningTips', userLanguage)}
            </Text>
            <View style={styles.tipsList}>
              <Text style={styles.tip}>• {t('tip1', userLanguage)}</Text>
              <Text style={styles.tip}>• {t('tip2', userLanguage)}</Text>
              <Text style={styles.tip}>• {t('tip3', userLanguage)}</Text>
            </View>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={onContinue}
          >
            <Text style={styles.continueButtonText}>
              {t('continueTest', userLanguage)} →
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 20,
    color: '#666',
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  careerList: {
    gap: 8,
  },
  careerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f8e9',
    padding: 12,
    borderRadius: 8,
  },
  careerEmoji: {
    fontSize: 16,
    marginRight: 12,
  },
  careerText: {
    fontSize: 14,
    color: '#388e3c',
    fontWeight: '500',
  },
  tipsList: {
    gap: 6,
  },
  tip: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  continueButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LearningModule;