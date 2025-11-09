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
import { signUpStudent, signIn, getCurrentUser, logout, getUserProfile } from '../../services/authService';

export default function TestAuthScreen({ navigateTo }) {
  const [status, setStatus] = useState('Ready to test...');
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null);

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

  // Test 1: Student Sign Up
  const testStudentSignUp = async () => {
    const timestamp = Date.now();
    const testData = {
      firstName: 'Test',
      lastName: 'Student',
      email: `student${timestamp}@example.com`,
      phone: `+97250${timestamp.toString().slice(-8)}`,
      israeliId: `1234567${timestamp.toString().slice(-2)}`, // Valid Israeli ID format
      dateOfBirth: '2000-01-01',
      password: 'password123',
    };
    
    return await signUpStudent(testData);
  };

  // Test 2: Sign In with Israeli ID
  const testSignInWithIsraeliId = async () => {
    // This will use the auto-detection to find user by Israeli ID
    return await signIn('123456789', 'password123'); // Use a real Israeli ID from your test data
  };

  // Test 3: Sign In with Phone
  const testSignInWithPhone = async () => {
    // This will use the auto-detection to find user by phone
    return await signIn('+972501234567', 'password123'); // Use a real phone from your test data
  };

  // Test 4: Sign In with Email
  const testSignInWithEmail = async () => {
    return await signIn('student@example.com', 'password123'); // Use a real email from your test data
  };

  // Test 5: Get Current User
  const testGetCurrentUser = async () => {
    const result = await getCurrentUser();
    if (result.success) {
      setCurrentUser(result.user);
      
      // Also get the full profile
      const profileResult = await getUserProfile(result.user.id);
      if (profileResult.success) {
        setCurrentProfile(profileResult.data);
      }
    }
    return result;
  };

  // Test 6: Logout
  const testLogout = async () => {
    const result = await logout();
    if (result.success) {
      setCurrentUser(null);
      setCurrentProfile(null);
    }
    return result;
  };

  // Test 7: Full Student Auth Flow
  const testFullStudentAuthFlow = async () => {
    setStatus('Starting full student auth flow test...');
    
    // Step 1: Student Sign Up
    const signupResult = await testStudentSignUp();
    if (!signupResult.success) return signupResult;
    
    // Step 2: Get Current User & Profile
    const userResult = await testGetCurrentUser();
    if (!userResult.success) return userResult;
    
    // Step 3: Logout
    const logoutResult = await testLogout();
    return logoutResult;
  };

  // Test 8: Test Auto-Detection Login
  const testAutoDetectionLogin = async () => {
    setStatus('Testing auto-detection login...');
    
    // Test with different identifier types
    const tests = [
      { type: 'Email', identifier: 'student@example.com' },
      { type: 'Phone', identifier: '+972501234567' },
      { type: 'Israeli ID', identifier: '123456789' }
    ];
    
    for (const test of tests) {
      setStatus(`Testing ${test.type} login...`);
      const result = await signIn(test.identifier, 'password123');
      if (!result.success) {
        return { success: false, error: `${test.type} login failed: ${result.error}` };
      }
      
      // Logout between tests
      await logout();
    }
    
    return { success: true, message: 'All auto-detection login tests passed!' };
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
        <Text style={styles.subtitle}>Test your multi-user authentication system</Text>

        {/* Current User Info */}
        {(currentUser || currentProfile) && (
          <View style={styles.userInfo}>
            <Text style={styles.userTitle}>Current Session:</Text>
            {currentUser && (
              <>
                <Text style={styles.userText}>User ID: {currentUser.id}</Text>
                <Text style={styles.userText}>Email: {currentUser.email}</Text>
              </>
            )}
            {currentProfile && (
              <>
                <Text style={styles.userText}>Name: {currentProfile.first_name} {currentProfile.last_name}</Text>
                <Text style={styles.userText}>Type: {currentProfile.user_type}</Text>
                <Text style={styles.userText}>Phone: {currentProfile.phone}</Text>
                {currentProfile.israeli_id && (
                  <Text style={styles.userText}>Israeli ID: {currentProfile.israeli_id}</Text>
                )}
              </>
            )}
          </View>
        )}

        {/* Test Buttons */}
        <View style={styles.testButtons}>
          <TouchableOpacity 
            style={[styles.testButton, styles.signupTest]}
            onPress={() => runTest('Student Sign Up', testStudentSignUp)}
            disabled={loading}
          >
            <Text style={styles.testButtonText}>🎓 Test Student Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.testButton, styles.signinTest]}
            onPress={() => runTest('Sign In (Email)', testSignInWithEmail)}
            disabled={loading}
          >
            <Text style={styles.testButtonText}>📧 Sign In (Email)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.testButton, styles.phoneTest]}
            onPress={() => runTest('Sign In (Phone)', testSignInWithPhone)}
            disabled={loading}
          >
            <Text style={styles.testButtonText}>📱 Sign In (Phone)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.testButton, styles.idTest]}
            onPress={() => runTest('Sign In (Israeli ID)', testSignInWithIsraeliId)}
            disabled={loading}
          >
            <Text style={styles.testButtonText}>🆔 Sign In (Israeli ID)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.testButton, styles.autoTest]}
            onPress={() => runTest('Auto-Detection Login', testAutoDetectionLogin)}
            disabled={loading}
          >
            <Text style={styles.testButtonText}>🔍 Test Auto-Detection</Text>
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
            onPress={() => runTest('Full Student Auth Flow', testFullStudentAuthFlow)}
            disabled={loading}
          >
            <Text style={styles.testButtonText}>🔄 Full Student Auth Flow</Text>
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
          <Text style={styles.instruction}>1. Start with "Test Student Sign Up"</Text>
          <Text style={styles.instruction}>2. Test different login methods (Email, Phone, Israeli ID)</Text>
          <Text style={styles.instruction}>3. Try "Auto-Detection" to test smart login</Text>
          <Text style={styles.instruction}>4. Check browser console for detailed logs</Text>
          <Text style={styles.instruction}>5. Verify users in Supabase dashboard</Text>
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
  phoneTest: {
    backgroundColor: '#8B5CF6',
  },
  idTest: {
    backgroundColor: '#EC4899',
  },
  autoTest: {
    backgroundColor: '#F59E0B',
  },
  userTest: {
    backgroundColor: '#6B7280',
  },
  logoutTest: {
    backgroundColor: '#EF4444',
  },
  fullTest: {
    backgroundColor: '#7C3AED',
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