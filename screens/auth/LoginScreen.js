import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AuthForm from '../../components/auth/AuthForm';

export default function LoginScreen({ onLogin, onSwitchToSignup }) {
  const handleSubmit = (formData) => {
    console.log('Login attempt:', formData);
    onLogin(formData);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AxiomPath</Text>
      </View>

      <AuthForm 
        type="login"
        onSubmit={handleSubmit}
        onSwitchType={onSwitchToSignup}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6366F1',
  },
});