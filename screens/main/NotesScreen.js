import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📚</Text>
      <Text style={styles.title}>Study Notes</Text>
      <Text style={styles.subtitle}>Access resources and study materials</Text>
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
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 24,
  },
});