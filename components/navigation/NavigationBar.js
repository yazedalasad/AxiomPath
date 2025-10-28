import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NavigationBar({ activeTab, onTabPress }) {
  const [hoverAnim] = useState(new Animated.Value(0));

  const tabs = [
    { id: 'home', icon: 'compass', label: 'Discover', color: '#6366F1' },
    { id: 'notes', icon: 'document-text', label: 'Notes', color: '#10B981' },
    { id: 'assessment', icon: 'analytics', label: 'Assessment', color: '#F59E0B' },
    { id: 'careers', icon: 'business', label: 'Careers', color: '#EF4444' },
    { id: 'profile', icon: 'person', label: 'Profile', color: '#8B5CF6' },
  ];

  const handleHover = (isHovering) => {
    Animated.spring(hoverAnim, {
      toValue: isHovering ? 1 : 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab
            ]}
            onPress={() => onTabPress(tab.id)}
            onPressIn={() => handleHover(true)}
            onPressOut={() => handleHover(false)}
            activeOpacity={0.7}
          >
            <Animated.View
              style={[
                styles.iconContainer,
                {
                  transform: [{
                    scale: activeTab === tab.id ? 
                      hoverAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1.1, 1.3]
                      }) : 
                      hoverAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.2]
                      })
                  }],
                  shadowOpacity: hoverAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 0.8]
                  }),
                }
              ]}
            >
              <Ionicons 
                name={tab.icon} 
                size={24} 
                color={activeTab === tab.id ? tab.color : '#94A3B8'} 
              />
              
              {activeTab === tab.id && (
                <Animated.View 
                  style={[
                    styles.glow,
                    {
                      opacity: hoverAnim,
                      backgroundColor: tab.color,
                    }
                  ]} 
                />
              )}
            </Animated.View>
            
            <Text style={[
              styles.label,
              activeTab === tab.id && { color: tab.color, fontWeight: '700' }
            ]}>
              {tab.label}
            </Text>
            
            {activeTab === tab.id && (
              <Animated.View 
                style={[
                  styles.activeIndicator,
                  { backgroundColor: tab.color }
                ]} 
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 8,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 20,
    position: 'relative',
  },
  activeTab: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 4,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 15,
    elevation: 5,
  },
  glow: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    opacity: 0.3,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    shadowOpacity: 0.8,
  },
  label: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
    marginTop: 2,
  },
  activeIndicator: {
    position: 'absolute',
    top: -2,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});