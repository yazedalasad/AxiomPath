import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AuthForm({ type = 'login', onSubmit, onSwitchType }) {
  const [formData, setFormData] = useState({
    // Login fields
    identifier: '', // Can be email, phone, or Israeli ID
    password: '',
    
    // Student signup fields
    email: '',
    phone: '',
    israeliId: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
  });

  const handleSubmit = () => {
    onSubmit(formData);
  };

  // Helper to show what type of identifier was entered
  const getIdentifierType = () => {
    if (formData.identifier.startsWith('+972')) return '📱 Phone';
    if (/^\d{9}$/.test(formData.identifier)) return '🆔 Israeli ID';
    if (formData.identifier.includes('@')) return '📧 Email';
    return 'Enter email, phone, or ID';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {type === 'login' ? 'Welcome Back' : 'Create Student Account'}
      </Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.form}>
          {type === 'login' ? (
            // LOGIN FIELDS
            <>
              <Text style={styles.label}>Email, Phone, or Israeli ID</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="key" size={20} color="#94A3B8" />
                <TextInput
                  style={styles.input}
                  placeholder="email@example.com or +9725... or 123456789"
                  placeholderTextColor="#64748B"
                  value={formData.identifier}
                  onChangeText={(text) => setFormData({...formData, identifier: text})}
                  autoCapitalize="none"
                />
              </View>
              <Text style={styles.helperText}>{getIdentifierType()}</Text>

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
            </>
          ) : (
            // STUDENT SIGNUP FIELDS
            <>
              <Text style={styles.label}>First Name</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person" size={20} color="#94A3B8" />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your first name"
                  placeholderTextColor="#64748B"
                  value={formData.firstName}
                  onChangeText={(text) => setFormData({...formData, firstName: text})}
                />
              </View>

              <Text style={styles.label}>Last Name</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person" size={20} color="#94A3B8" />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your last name"
                  placeholderTextColor="#64748B"
                  value={formData.lastName}
                  onChangeText={(text) => setFormData({...formData, lastName: text})}
                />
              </View>

              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail" size={20} color="#94A3B8" />
                <TextInput
                  style={styles.input}
                  placeholder="email@example.com"
                  placeholderTextColor="#64748B"
                  value={formData.email}
                  onChangeText={(text) => setFormData({...formData, email: text})}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <Text style={styles.label}>Phone</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="call" size={20} color="#94A3B8" />
                <TextInput
                  style={styles.input}
                  placeholder="+972501234567"
                  placeholderTextColor="#64748B"
                  value={formData.phone}
                  onChangeText={(text) => setFormData({...formData, phone: text})}
                  keyboardType="phone-pad"
                />
              </View>

              <Text style={styles.label}>Israeli ID</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="card" size={20} color="#94A3B8" />
                <TextInput
                  style={styles.input}
                  placeholder="123456789"
                  placeholderTextColor="#64748B"
                  value={formData.israeliId}
                  onChangeText={(text) => setFormData({...formData, israeliId: text})}
                  keyboardType="number-pad"
                  maxLength={9}
                />
              </View>

              <Text style={styles.label}>Date of Birth</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="calendar" size={20} color="#94A3B8" />
                <TextInput
                  style={styles.input}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#64748B"
                  value={formData.dateOfBirth}
                  onChangeText={(text) => setFormData({...formData, dateOfBirth: text})}
                />
              </View>

              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed" size={20} color="#94A3B8" />
                <TextInput
                  style={styles.input}
                  placeholder="Create password"
                  placeholderTextColor="#64748B"
                  secureTextEntry
                  value={formData.password}
                  onChangeText={(text) => setFormData({...formData, password: text})}
                />
              </View>
            </>
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>
              {type === 'login' ? 'Sign In' : 'Create Student Account'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.switchContainer} onPress={onSwitchType}>
            <Text style={styles.switchText}>
              {type === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
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
  helperText: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: -10,
    marginBottom: 10,
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