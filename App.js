import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AxiomPath</Text>
      <Text style={styles.subtitle}>Find Your Perfect College Major</Text>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Start Assessment</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>Explore Majors</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6366F1',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#94A3B8',
    marginBottom: 50,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#6366F1',
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#6366F1',
    fontSize: 18,
    fontWeight: 'bold',
  },
});