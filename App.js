import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';

// Simple Navigation Bar without icons
function SimpleNavigationBar({ activeTab, onTabPress }) {
  const tabs = [
    { id: 'home', label: 'Discover', color: '#6366F1' },
    { id: 'notes', label: 'Notes', color: '#10B981' },
    { id: 'assessment', label: 'Assessment', color: '#F59E0B' },
    { id: 'careers', label: 'Careers', color: '#EF4444' },
    { id: 'profile', label: 'Profile', color: '#8B5CF6' },
  ];

  return (
    <View style={styles.navBar}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tab,
            activeTab === tab.id && { backgroundColor: tab.color + '20' }
          ]}
          onPress={() => onTabPress(tab.id)}
        >
          <Text style={[
            styles.tabText,
            activeTab === tab.id && { color: tab.color, fontWeight: 'bold' }
          ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// Simple Home Screen
function HomeScreen({ onNavigate }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AxiomPath 🚀</Text>
      <Text style={styles.subtitle}>Find Your Perfect College Major</Text>
      <TouchableOpacity style={styles.button} onPress={() => onNavigate('assessment')}>
        <Text style={styles.buttonText}>Start Assessment</Text>
      </TouchableOpacity>
    </View>
  );
}

// Main App
export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen onNavigate={setActiveTab} />;
      default:
        return (
          <View style={styles.container}>
            <Text style={styles.title}>{activeTab} Screen</Text>
            <Text style={styles.subtitle}>Coming soon!</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.appContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <View style={styles.mainContent}>
        {renderScreen()}
      </View>
      <SimpleNavigationBar activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  mainContent: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6366F1',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  tabText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
});