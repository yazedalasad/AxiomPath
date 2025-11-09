import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChartBarIcon, TrophyIcon, ClockIcon, DocumentTextIcon } from 'react-native-heroicons/outline';
import ResultCard from '../Components/ResultCard';
import PerformanceChart from '../Components/PerformanceChart';
import { database } from '../config/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const TestResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const auth = getAuth();
  
  const {
    score,
    totalQuestions,
    percentage,
    totalTime,
    testTitle,
    answers,
    testData
  } = route.params;

  const [userRank, setUserRank] = useState(null);
  const [averageScore, setAverageScore] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [detailedAnalysis, setDetailedAnalysis] = useState(null);

  useEffect(() => {
    fetchTestStatistics();
    analyzePerformance();
  }, []);

  const fetchTestStatistics = async () => {
    try {
      // Get all attempts for this test
      const usersRef = collection(database, 'users');
      const q = query(usersRef, where('testHistory', 'array-contains', { testId: testData.id }));
      const querySnapshot = await getDocs(q);

      const allScores = [];
      querySnapshot.forEach(doc => {
        const userData = doc.data();
        userData.testHistory?.forEach(attempt => {
          if (attempt.testId === testData.id) {
            allScores.push(attempt.percentage);
          }
        });
      });

      // Calculate average and rank
      if (allScores.length > 0) {
        const avg = allScores.reduce((a, b) => a + b, 0) / allScores.length;
        setAverageScore(Math.round(avg));

        // Calculate percentile rank
        const scoresBelow = allScores.filter(s => s < percentage).length;
        const rank = Math.round((scoresBelow / allScores.length) * 100);
        setUserRank(rank);
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  const analyzePerformance = () => {
    const analysis = {
      byDifficulty: {
        easy: { correct: 0, total: 0 },
        medium: { correct: 0, total: 0 },
        hard: { correct: 0, total: 0 }
      },
      byTime: {
        fast: { correct: 0, total: 0 }, // < 30 sec
        medium: { correct: 0, total: 0 }, // 30-60 sec
        slow: { correct: 0, total: 0 } // > 60 sec
      }
    };

    answers.forEach((answer, index) => {
      const question = testData.questions[index];
      
      // Analyze by difficulty
      if (question.difficulty && analysis.byDifficulty[question.difficulty]) {
        analysis.byDifficulty[question.difficulty].total++;
        if (answer.isCorrect) {
          analysis.byDifficulty[question.difficulty].correct++;
        }
      }

      // Analyze by time spent
      let timeCategory = 'medium';
      if (answer.timeSpent < 30) timeCategory = 'fast';
      else if (answer.timeSpent > 60) timeCategory = 'slow';
      
      analysis.byTime[timeCategory].total++;
      if (answer.isCorrect) {
        analysis.byTime[timeCategory].correct++;
      }
    });

    setDetailedAnalysis(analysis);
  };

  const shareResults = async () => {
    try {
      const message = `I scored ${score}/${totalQuestions} (${percentage}%) on "${testTitle}"! 🎯`;
      await Share.share({
        message,
        title: 'My Test Results'
      });
    } catch (error) {
      console.error('Error sharing results:', error);
    }
  };

  const retakeTest = () => {
    Alert.alert(
      'Retake Test',
      'Are you sure you want to retake this test? Your previous attempt will be saved in your history.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Retake', 
          style: 'default',
          onPress: () => navigation.navigate('Test', { testId: testData.id })
        }
      ]
    );
  };

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Outstanding! 🎉";
    if (percentage >= 80) return "Excellent work! 👏";
    if (percentage >= 70) return "Good job! 👍";
    if (percentage >= 60) return "Not bad! 😊";
    if (percentage >= 50) return "You passed! ✅";
    return "Keep practicing! 💪";
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Test Complete!</Text>
        <Text style={styles.testTitle}>{testTitle}</Text>
        <Text style={styles.performanceMessage}>{getPerformanceMessage()}</Text>
      </View>

      {/* Main Result Card */}
      <ResultCard
        score={score}
        totalQuestions={totalQuestions}
        percentage={percentage}
        totalTime={formatTime(totalTime)}
        date={new Date().toLocaleDateString()}
      />

      {/* Statistics */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Your Performance</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <TrophyIcon size={24} color="#FFD700" />
            <Text style={styles.statValue}>{score}/{totalQuestions}</Text>
            <Text style={styles.statLabel}>Score</Text>
          </View>
          
          <View style={styles.statItem}>
            <ChartBarIcon size={24} color="#007AFF" />
            <Text style={styles.statValue}>{percentage}%</Text>
            <Text style={styles.statLabel}>Percentage</Text>
          </View>
          
          <View style={styles.statItem}>
            <ClockIcon size={24} color="#34C759" />
            <Text style={styles.statValue}>{formatTime(totalTime)}</Text>
            <Text style={styles.statLabel}>Time</Text>
          </View>

          {!loadingStats && averageScore && (
            <View style={styles.statItem}>
              <DocumentTextIcon size={24} color="#FF6B6B" />
              <Text style={styles.statValue}>{userRank}%</Text>
              <Text style={styles.statLabel}>Percentile</Text>
            </View>
          )}
        </View>

        {/* Comparison with average */}
        {!loadingStats && averageScore && (
          <View style={styles.comparisonCard}>
            <Text style={styles.comparisonTitle}>How you compare</Text>
            <View style={styles.comparisonBar}>
              <View style={[styles.scoreBar, { width: `${averageScore}%` }]}>
                <Text style={styles.barText}>Average: {averageScore}%</Text>
              </View>
              <View style={[styles.scoreBar, styles.yourScore, { width: `${percentage}%` }]}>
                <Text style={styles.barText}>You: {percentage}%</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Detailed Analysis */}
      {detailedAnalysis && (
        <View style={styles.analysisSection}>
          <Text style={styles.sectionTitle}>Detailed Analysis</Text>
          
          <View style={styles.analysisGrid}>
            <View style={styles.analysisCategory}>
              <Text style={styles.analysisTitle}>By Difficulty</Text>
              {Object.entries(detailedAnalysis.byDifficulty).map(([difficulty, data]) => (
                <View key={difficulty} style={styles.analysisItem}>
                  <Text style={styles.analysisLabel}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </Text>
                  <Text style={styles.analysisValue}>
                    {data.correct}/{data.total} ({data.total > 0 ? Math.round((data.correct/data.total)*100) : 0}%)
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.analysisCategory}>
              <Text style={styles.analysisTitle}>By Time Spent</Text>
              {Object.entries(detailedAnalysis.byTime).map(([timeCat, data]) => (
                <View key={timeCat} style={styles.analysisItem}>
                  <Text style={styles.analysisLabel}>
                    {timeCat.charAt(0).toUpperCase() + timeCat.slice(1)}
                  </Text>
                  <Text style={styles.analysisValue}>
                    {data.correct}/{data.total} ({data.total > 0 ? Math.round((data.correct/data.total)*100) : 0}%)
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}

      {/* Performance Chart */}
      <PerformanceChart answers={answers} />

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.button, styles.primaryButton]}
          onPress={shareResults}
        >
          <Text style={styles.buttonText}>Share Results</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]}
          onPress={retakeTest}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>Retake Test</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.outlineButton]}
          onPress={() => navigation.navigate('TestList')}
        >
          <Text style={[styles.buttonText, styles.outlineButtonText]}>Browse More Tests</Text>
        </TouchableOpacity>
      </View>

      {/* Review Answers (Optional) */}
      <TouchableOpacity 
        style={styles.reviewButton}
        onPress={() => navigation.navigate('ReviewAnswers', { answers, testData })}
      >
        <Text style={styles.reviewButtonText}>Review Answers</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { alignItems: 'center', padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 32, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  testTitle: { fontSize: 18, color: '#666', textAlign: 'center', marginBottom: 10 },
  performanceMessage: { fontSize: 16, color: '#007AFF', fontWeight: '500' },
  statsSection: { padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  statsGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    marginBottom: 20
  },
  statItem: { 
    alignItems: 'center', 
    width: '48%', 
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10
  },
  statValue: { fontSize: 20, fontWeight: 'bold', marginTop: 5, color: '#333' },
  statLabel: { fontSize: 12, color: '#666', marginTop: 2 },
  comparisonCard: { backgroundColor: '#f0f8ff', padding: 15, borderRadius: 12 },
  comparisonTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10, color: '#333' },
  comparisonBar: { backgroundColor: '#e3f2fd', height: 30, borderRadius: 15, overflow: 'hidden' },
  scoreBar: { 
    height: '100%', 
    backgroundColor: '#007AFF', 
    justifyContent: 'center',
    paddingLeft: 10
  },
  yourScore: { backgroundColor: '#34C759', position: 'absolute' },
  barText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  analysisSection: { padding: 20, paddingTop: 0 },
  analysisGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  analysisCategory: { width: '48%' },
  analysisTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10, color: '#333' },
  analysisItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  analysisLabel: { fontSize: 14, color: '#666' },
  analysisValue: { fontSize: 14, fontWeight: '500', color: '#333' },
  actions: { padding: 20, paddingTop: 0 },
  button: { 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center',
    marginBottom: 10
  },
  primaryButton: { backgroundColor: '#007AFF' },
  secondaryButton: { backgroundColor: '#34C759' },
  outlineButton: { 
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#007AFF'
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  secondaryButtonText: { color: 'white' },
  outlineButtonText: { color: '#007AFF' },
  reviewButton: { 
    padding: 15, 
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 10
  },
  reviewButtonText: { color: '#007AFF', fontSize: 16, fontWeight: '500' }
});

export default TestResultScreen;
