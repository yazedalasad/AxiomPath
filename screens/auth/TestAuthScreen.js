import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Alert 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { signUp, signIn, getCurrentUser, logout } from '../../services/authService';

export default function TestAuthScreen({ navigateTo }) {
  const [status, setStatus] = useState('Ready to test...');
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const runTest = async (testName, testFunction) => {
    setLoading(true);
    setStatus(`Running ${testName}...`);
    
    try {
      const result = await testFunction();
      console.log(`✅ ${testName}:`, result);
      setStatus(`✅ ${testName}: ${result.success ? 'SUCCESS' : 'FAILED'}`);
      
      if (result.success) {
        Alert.alert('✅ SUCCESS', `${testName} completed successfully!`);
      } else {
        Alert.alert('❌ FAILED', `${testName}: ${result.error}`);
      }
      
      return result;
    } catch (error) {
      console.log(`❌ ${testName} error:`, error);
      setStatus(`❌ ${testName}: ${error.message}`);
      Alert.alert('💥 ERROR', `${testName}: ${error.message}`);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Test 1: Sign Up
  const testSignUp = async () => {
    const testData = {
      firstName: 'Test',
      lastName: 'User',
      email: `test${Date.now()}@example.com`,
      phone: '+1234567890',
      studentId: `2024${Date.now()}`,
      password: 'password123',
      confirmPassword: 'password123'
    };
    
    return await signUp(testData);
  };

  // Test 2: Sign In
  const testSignIn = async () => {
    return await signIn('test@example.com', 'password123');
  };

  // Test 3: Get Current User
  const testGetCurrentUser = async () => {
    const result = await getCurrentUser();
    if (result.success) {
      setCurrentUser(result.user);
    }
    return result;
  };

  // Test 4: Logout
  const testLogout = async () => {
    const result = await logout();
    if (result.success) {
      setCurrentUser(null);
    }
    return result;
  };

  // Test 5: Full Auth Flow
  const testFullAuthFlow = async () => {
    setStatus('Starting full auth flow test...');
    
    // Step 1: Sign Up
    const signupResult = await testSignUp();
    if (!signupResult.success) return signupResult;
    
    // Step 2: Get Current User
    const userResult = await testGetCurrentUser();
    if (!userResult.success) return userResult;
    
    // Step 3: Logout
    const logoutResult = await testLogout();
    return logoutResult;
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#0F172A', '#1E293B', '#334155']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>🧪 Auth Service Tests</Text>
        <Text style={styles.subtitle}>Test your Supabase connection</Text>

        {/* Current User Info */}
        {currentUser && (
          <View style={styles.userInfo}>
            <Text style={styles.userTitle}>Current User:</Text>
            <Text style={styles.userText}>ID: {currentUser.id}</Text>
            <Text style={styles.userText}>Email: {currentUser.email}</Text>
          </View>
        )}

        {/* Test Buttons */}
        <View style={styles.testButtons}>
          <TouchableOpacity 
            style={[styles.testButton, styles.signupTest]}
            onPress={() => runTest('Sign Up', testSignUp)}
            disabled={loading}
          >
            <Text style={styles.testButtonText}>🧪 Test Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.testButton, styles.signinTest]}
            onPress={() => runTest('Sign In', testSignIn)}
            disabled={loading}
          >
            <Text style={styles.testButtonText}>🔐 Test Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.testButton, styles.userTest]}
            onPress={() => runTest('Get Current User', testGetCurrentUser)}
            disabled={loading}
          >
            <Text style={styles.testButtonText}>👤 Get Current User</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.testButton, styles.logoutTest]}
            onPress={() => runTest('Logout', testLogout)}
            disabled={loading}
          >
            <Text style={styles.testButtonText}>🚪 Test Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.testButton, styles.fullTest]}
            onPress={() => runTest('Full Auth Flow', testFullAuthFlow)}
            disabled={loading}
          >
            <Text style={styles.testButtonText}>🔄 Full Auth Flow Test</Text>
          </TouchableOpacity>
        </View>

        {/* Status Display */}
        <View style={styles.statusBox}>
          <Text style={styles.statusTitle}>Test Status:</Text>
          <Text style={styles.statusText}>{status}</Text>
        </View>

        {/* Instructions */}
        <View style={styles.instructions}>
          <Text style={styles.instructionsTitle}>📋 Testing Instructions:</Text>
          <Text style={styles.instruction}>1. Start with "Test Sign Up"</Text>
          <Text style={styles.instruction}>2. Check browser console for detailed logs</Text>
          <Text style={styles.instruction}>3. Verify user appears in Supabase dashboard</Text>
          <Text style={styles.instruction}>4. Try "Full Auth Flow" for complete test</Text>
        </View>

        {/* Navigation */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigateTo('auth')}
        >
          <Text style={styles.backButtonText}>← Back to Auth Screens</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 30,
    textAlign: 'center',
  },
  userInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
  },
  userTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6366F1',
    marginBottom: 8,
  },
  userText: {
    fontSize: 14,
    color: '#E2E8F0',
    marginBottom: 4,
  },
  testButtons: {
    width: '100%',
    gap: 12,
    marginBottom: 20,
  },
  testButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  signupTest: {
    backgroundColor: '#10B981',
  },
  signinTest: {
    backgroundColor: '#3B82F6',
  },
  userTest: {
    backgroundColor: '#8B5CF6',
  },
  logoutTest: {
    backgroundColor: '#EF4444',
  },
  fullTest: {
    backgroundColor: '#F59E0B',
  },
  testButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBox: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#94A3B8',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#F8FAFC',
    textAlign: 'center',
  },
  instructions: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6366F1',
    marginBottom: 12,
  },
  instruction: {
    fontSize: 14,
    color: '#E2E8F0',
    marginBottom: 6,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});