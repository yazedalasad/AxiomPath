import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CareersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🚀</Text>
      <Text style={styles.title}>Career Paths</Text>
      <Text style={styles.subtitle}>Explore different professional journeys</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#1E293B',
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
  },
  subtitle: {
    fontSize: 18,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 12,
  },
});
