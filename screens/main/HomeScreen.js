import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ onNavigate }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🎯</Text>
      <Text style={styles.title}>Discover Your Path</Text>
      <Text style={styles.subtitle}>Find the perfect college major for your future</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => onNavigate('assessment')}>
          <Text style={styles.primaryButtonText}>Start Assessment</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryButton} onPress={() => onNavigate('notes')}>
          <Text style={styles.secondaryButtonText}>Browse Notes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#0F172A',
  },
  icon: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F8FAFC',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#6366F1',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#6366F1',
    fontSize: 18,
    fontWeight: 'bold',
  },
});