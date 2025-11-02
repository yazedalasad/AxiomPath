import React, { useState } from 'react';
import { View } from 'react-native';
import { LanguageProvider } from '../contexts/LanguageContext';
import AuthScreen from '../screens/auth/AuthScreen';

// Simple manual navigation - NO external dependencies
export default function ManualNavigator() {
  const [currentScreen, setCurrentScreen] = useState('auth');

  const navigateTo = (screen) => {
    console.log('Navigating to:', screen);
    setCurrentScreen(screen);
  };

  // Simple screen router
  const renderScreen = () => {
    switch (currentScreen) {
      case 'auth':
        return <AuthScreen navigateTo={navigateTo} />;
      case 'dashboard':
        // We'll create this later
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0F172A' }}>
            <Text style={{ color: 'white', fontSize: 24 }}>Dashboard</Text>
            <Text style={{ color: 'white', fontSize: 16 }}>Coming Soon!</Text>
            <TouchableOpacity 
              style={{ marginTop: 20, padding: 15, backgroundColor: '#6366F1', borderRadius: 10 }}
              onPress={() => navigateTo('auth')}
            >
              <Text style={{ color: 'white' }}>Back to Auth</Text>
            </TouchableOpacity>
          </View>
        );
      // We can add more screens like this:
      // case 'profile':
      //   return <ProfileScreen navigateTo={navigateTo} />;
      default:
        return <AuthScreen navigateTo={navigateTo} />;
    }
  };

  return (
    <LanguageProvider>
      <View style={{ flex: 1 }}>
        {renderScreen()}
      </View>
    </LanguageProvider>
  );
}