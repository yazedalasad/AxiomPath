import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, StatusBar, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AuthForm from '../../components/auth/AuthForm';

export default function SignupScreen({ onSignup, onSwitchToLogin }) {
  const handleSubmit = (formData) => {
    console.log('Signup attempt:', formData);
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    onSignup(formData);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onSwitchToLogin}>
          <Ionicons name="arrow-back" size={24} color="#F8FAFC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Join AxiomPath</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <AuthForm 
          type="signup"
          onSubmit={handleSubmit}
          onSwitchType={onSwitchToLogin}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6366F1',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
});