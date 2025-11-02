import React, { useState, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions, 
  Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LanguageSelector from '../../components/LanguageSelector';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';

const { width } = Dimensions.get('window');

export default function AuthScreen({ navigateTo }) {
  const [currentView, setCurrentView] = useState('login'); // 'login' or 'signup'
  
  // Animation values
  const slideAnim = useRef(new Animated.Value(0)).current;
  const loginOpacity = useRef(new Animated.Value(1)).current;
  const signupOpacity = useRef(new Animated.Value(0)).current;

  const switchToSignup = () => {
    // Animate to signup (slide left)
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(loginOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(signupOpacity, {
        toValue: 1,
        duration: 300,
        delay: 100,
        useNativeDriver: true,
      })
    ]).start(() => {
      setCurrentView('signup');
    });
  };

  const switchToLogin = () => {
    // Animate to login (slide right)
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(signupOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(loginOpacity, {
        toValue: 1,
        duration: 300,
        delay: 100,
        useNativeDriver: true,
      })
    ]).start(() => {
      setCurrentView('login');
    });
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={currentView === 'login' ? ['#6366F1', '#8B5CF6', '#EC4899'] : ['#EC4899', '#8B5CF6', '#6366F1']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Language Selector */}
      <LanguageSelector />
      
      {/* Animated Container */}
      <Animated.View 
        style={[
          styles.panelsContainer,
          {
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        {/* Login Panel - LEFT */}
        <Animated.View 
          style={[
            styles.panel,
            {
              opacity: loginOpacity
            }
          ]}
        >
          <LoginScreen 
            onSwitchToSignup={switchToSignup}
            navigateTo={navigateTo}
          />
        </Animated.View>

        {/* Signup Panel - RIGHT */}
        <Animated.View 
          style={[
            styles.panel,
            {
              opacity: signupOpacity
            }
          ]}
        >
          <SignupScreen 
            onSwitchToLogin={switchToLogin}
            navigateTo={navigateTo}
          />
        </Animated.View>
      </Animated.View>

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, currentView === 'login' && styles.activeDot]} />
        <View style={[styles.dot, currentView === 'signup' && styles.activeDot]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  panelsContainer: {
    flex: 1,
    flexDirection: 'row',
    width: width * 2, // Double width for two panels
  },
  panel: {
    width: width,
    flex: 1,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 20,
  },
});