import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, StyleSheet } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../utils/languages';

export default function LanguageSelector() {
  const { currentLanguage, switchLanguage, textDirection } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);

  const currentLang = languages[currentLanguage];

  return (
    <View style={[styles.container, { 
      top: 50, 
      [textDirection === 'rtl' ? 'left' : 'right']: 20 
    }]}>
      <TouchableOpacity 
        style={styles.selectorButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectorText}>
          {currentLang.flag} {currentLang.name}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            {Object.values(languages).map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageOption,
                  currentLanguage === lang.code && styles.selectedOption
                ]}
                onPress={() => {
                  switchLanguage(lang.code);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.languageText}>
                  {lang.flag} {lang.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1000,
  },
  selectorButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  selectorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  languageOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 4,
  },
  selectedOption: {
    backgroundColor: '#6366F1',
  },
  languageText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});