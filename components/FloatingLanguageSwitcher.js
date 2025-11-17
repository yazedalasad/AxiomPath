import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { I18nManager, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FloatingLanguageSwitcher() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || 'ar');

  const changeLanguage = async (lang) => {
    console.log('=== Language Change Started ===');
    console.log('Changing language to:', lang);
    console.log('Current language before change:', i18n.language);

    try {
      await i18n.changeLanguage(lang);
      setCurrentLang(lang);
      console.log('Language changed successfully to:', i18n.language);
      console.log('State updated to:', lang);

      // Force RTL update for Hebrew and Arabic
      const isRTL = lang === 'ar' || lang === 'he';
      if (I18nManager.isRTL !== isRTL) {
        I18nManager.forceRTL(isRTL);
        console.log(`RTL forced to ${isRTL} for language: ${lang}`);
      }

      console.log('=== Language Change Complete ===');
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  console.log('FloatingLanguageSwitcher render - Current language:', currentLang);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          currentLang === 'ar' && styles.activeButton
        ]}
        onPress={() => changeLanguage('ar')}
      >
        <Text style={styles.flag}>🇵🇸</Text>
        <Text style={[
          styles.buttonText,
          currentLang === 'ar' && styles.activeButtonText
        ]}>
          ع
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          currentLang === 'he' && styles.activeButton
        ]}
        onPress={() => changeLanguage('he')}
      >
        <Text style={styles.flag}>🇮🇱</Text>
        <Text style={[
          styles.buttonText,
          currentLang === 'he' && styles.activeButtonText
        ]}>
          ע
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 16,
    flexDirection: 'row',
    gap: 8,
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  activeButton: {
    backgroundColor: '#27ae60',
    borderColor: '#27ae60',
  },
  flag: {
    fontSize: 16,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2c3e50',
  },
  activeButtonText: {
    color: '#fff',
  },
});
