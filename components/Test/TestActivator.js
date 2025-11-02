import React, { useState } from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import TestAuthScreen from '../../screens/auth/TestAuthScreen';

export default function TestActivator() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [lastTap, setLastTap] = useState(0);

  const handleTap = () => {
    const now = Date.now();
    
    if (now - lastTap < 300) { // 300ms between taps
      const newCount = tapCount + 1;
      setTapCount(newCount);
      
      if (newCount >= 2) { // Triple tap detected
        setModalVisible(true);
        setTapCount(0);
      }
    } else {
      setTapCount(1); // First tap
    }
    
    setLastTap(now);
  };

  return (
    <>
      {/* Hidden activator - triple tap top right corner */}
      <TouchableOpacity 
        style={styles.activator}
        onPress={handleTap}
        activeOpacity={1}
      >
        <View style={styles.hiddenArea} />
      </TouchableOpacity>

      {/* Test Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalVisible(false)}
      >
        <TestAuthScreen navigateTo={() => setModalVisible(false)} />
        
        {/* Close button */}
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.closeButtonText}>✕ Close Tests</Text>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  activator: {
    position: 'absolute',
    top: 40,
    right: 0,
    width: 80,
    height: 80,
    zIndex: 9999,
  },
  hiddenArea: {
    width: '100%',
    height: '100%',
    // Completely invisible but tappable
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 10000,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});