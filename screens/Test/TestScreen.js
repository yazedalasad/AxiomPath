import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Alert, BackHandler, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import QuestionCard from '../Components/QuestionCard';
import OptionButton from '../Components/OptionButton';
import ProgressBar from '../Components/ProgressBar';
import Timer from '../Components/Timer';
import { database } from '../config/firebase';
import { collection, doc, getDoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const TestScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { testId } = route.params;
  const auth = getAuth();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [testData, setTestData] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeSpent, setTimeSpent] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    fetchTestData();
    
    // Start timer
    timerRef.current = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    // Handle back button
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      showExitConfirmation();
      return true;
    });

    return () => {
      clearInterval(timerRef.current);
      backHandler.remove();
    };
  }, []);

  const fetchTestData = async () => {
    try {
      const testRef = doc(database, 'tests', testId);
      const testSnap = await getDoc(testRef);
      
      if (testSnap.exists()) {
        const data = testSnap.data();
        setTestData({
          id: testSnap.id,
          ...data,
          questions: data.questions || []
        });
      } else {
        Alert.alert('Error', 'Test not found');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error fetching test:', error);
      Alert.alert('Error', 'Failed to load test');
    } finally {
      setLoading(false);
    }
  };

  const showExitConfirmation = () => {
    Alert.alert(
      'Exit Test',
      'Are you sure you want to exit? Your progress will be lost.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Exit', style: 'destructive', onPress: () => navigation.goBack() }
      ]
    );
  };

  const handleAnswer = async (selectedOption) => {
    if (!testData) return;

    const currentQ = testData.questions[currentQuestion];
    const answerData = {
      questionId: currentQ.id,
      question: currentQ.question,
      selectedOption,
      correctOption: currentQ.correctAnswer,
      isCorrect: selectedOption === currentQ.correctAnswer,
      timestamp: new Date(),
      timeSpent: timeSpent
    };

    const updatedAnswers = [...userAnswers, answerData];
    setUserAnswers(updatedAnswers);

    // Move to next question or finish test
    if (currentQuestion < testData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeSpent(0); // Reset per question timer
    } else {
      await finishTest(updatedAnswers);
    }
  };

  const finishTest = async (answers) => {
    try {
      clearInterval(timerRef.current);
      
      const score = answers.filter(answer => answer.isCorrect).length;
      const totalQuestions = testData.questions.length;
      const percentage = (score / totalQuestions) * 100;
      const totalTime = answers.reduce((total, answer) => total + answer.timeSpent, 0);

      // Save results to database
      const resultData = {
        testId: testData.id,
        testTitle: testData.title,
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName || auth.currentUser.email,
        score,
        totalQuestions,
        percentage: Math.round(percentage),
        totalTime,
        answers,
        completedAt: serverTimestamp(),
        testCategory: testData.category
      };

      // Save to user's test history
      const userRef = doc(database, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        testHistory: arrayUnion(resultData)
      });

      // Update test statistics
      const testRef = doc(database, 'tests', testData.id);
      await updateDoc(testRef, {
        'stats.totalAttempts': arrayUnion(auth.currentUser.uid),
        'stats.averageScore': 0, // You'd calculate this based on all attempts
        lastAttempt: serverTimestamp()
      });

      navigation.navigate('TestResult', {
        score,
        totalQuestions,
        percentage: Math.round(percentage),
        totalTime,
        testTitle: testData.title,
        answers,
        testData: testData
      });

    } catch (error) {
      console.error('Error saving test results:', error);
      Alert.alert('Error', 'Failed to save test results');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading test...</Text>
      </View>
    );
  }

  if (!testData) {
    return (
      <View style={styles.center}>
        <Text>Test not found</Text>
      </View>
    );
  }

  const currentQ = testData.questions[currentQuestion];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.testTitle}>{testData.title}</Text>
        <Text style={styles.questionCounter}>
          Question {currentQuestion + 1} of {testData.questions.length}
        </Text>
      </View>

      <Timer 
        duration={testData.duration * 60} // Convert minutes to seconds
        onTimeUp={() => finishTest(userAnswers)}
      />
      
      <ProgressBar 
        current={currentQuestion + 1} 
        total={testData.questions.length} 
      />

      <QuestionCard 
        question={currentQ.question}
        questionNumber={currentQuestion + 1}
        image={currentQ.image}
        type={currentQ.type}
      />
      
      <View style={styles.optionsContainer}>
        {currentQ.options.map((option, index) => (
          <OptionButton
            key={index}
            option={option}
            optionLetter={String.fromCharCode(65 + index)} // A, B, C, D
            onPress={() => handleAnswer(option)}
            disabled={false}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.timeText}>Time on this question: {formatTime(timeSpent)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { marginBottom: 20 },
  testTitle: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  questionCounter: { fontSize: 16, color: '#666', marginTop: 5 },
  optionsContainer: { marginTop: 20, flex: 1 },
  footer: { marginTop: 20, alignItems: 'center' },
  timeText: { fontSize: 14, color: '#666' }
});

export default TestScreen;
