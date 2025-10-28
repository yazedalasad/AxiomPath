import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AuthForm({ type = 'login', onSubmit, onSwitchType }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {type === 'login' ? 'Welcome Back' : 'Create Account'}
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={20} color="#94A3B8" />
          <TextInput
            style={styles.input}
            placeholder="email@example.com"
            placeholderTextColor="#64748B"
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={20} color="#94A3B8" />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            placeholderTextColor="#64748B"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => setFormData({...formData, password: text})}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>
            {type === 'login' ? 'Sign In' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.switchContainer} onPress={onSwitchType}>
          <Text style={styles.switchText}>
            {type === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F8FAFC',
    textAlign: 'center',
    marginBottom: 30,
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E2E8F0',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    color: '#F8FAFC',
    fontSize: 16,
    marginLeft: 12,
  },
  submitButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  switchText: {
    color: '#6366F1',
    fontSize: 16,
    fontWeight: '500',
  },
});