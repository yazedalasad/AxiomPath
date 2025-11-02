import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  // For now - we'll add auth state later
  const isAuthenticated = false;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          // TODO: Add main app screens here later
          <Stack.Screen name="Main" component={SignupScreen} />
        ) : (
          // Auth flow - using your existing screens
          <>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Signup" 
              component={SignupScreen} 
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
