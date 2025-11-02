import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../../contexts/LanguageContext';
import { t } from '../../utils/languages';

const { width } = Dimensions.get('window');

export default function LoginScreen({ onSwitchToSignup, navigateTo }) {
  const { currentLanguage, textDirection } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      alert(t('fillAllFields', currentLanguage));
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Login functionality will be connected to authService next');
    }, 1000);
  };

  const isRTL = textDirection === 'rtl';

  return (
    <View style={[styles.container, isRTL && styles.rtlContainer]}>
      {/* Gradient Background */}
      <LinearGradient
        colors={['#6366F1', '#8B5CF6', '#EC4899']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Main Container */}
      <View style={styles.mainContainer}>
        <View style={[styles.content, isRTL && styles.rtlContent]}>
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              {t('welcomeBack', currentLanguage)}
            </Text>
            <Text style={styles.subtitle}>
              {t('loginSubtitle', currentLanguage)}
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, isRTL && styles.rtlText]}>
                {t('email', currentLanguage)}
              </Text>
              <View style={[
                styles.inputContainer,
                focusedField === 'email' && styles.inputFocused
              ]}>
                <TextInput
                  style={[styles.input, isRTL && styles.rtlInput]}
                  placeholder={t('emailPlaceholder', currentLanguage)}
                  placeholderTextColor="#64748B"
                  value={formData.email}
                  onChangeText={(text) => setFormData({...formData, email: text})}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, isRTL && styles.rtlText]}>
                {t('password', currentLanguage)}
              </Text>
              <View style={[
                styles.inputContainer,
                focusedField === 'password' && styles.inputFocused
              ]}>
                <TextInput
                  style={[styles.input, isRTL && styles.rtlInput]}
                  placeholder={t('passwordPlaceholder', currentLanguage)}
                  placeholderTextColor="#64748B"
                  secureTextEntry
                  value={formData.password}
                  onChangeText={(text) => setFormData({...formData, password: text})}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={[styles.forgotPassword, isRTL && styles.rtlForgot]}>
              <Text style={styles.forgotText}>
                {t('forgotPassword', currentLanguage)}
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity 
              style={[styles.loginButton, loading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                style={styles.gradientButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.loginButtonText}>
                  {loading ? t('signingIn', currentLanguage) : t('login', currentLanguage)}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Switch to Signup */}
            <View style={[styles.switchContainer, isRTL && styles.rtlSwitch]}>
              <Text style={styles.switchText}>
                {t('noAccount', currentLanguage)}
              </Text>
              <TouchableOpacity onPress={onSwitchToSignup}>
                <Text style={styles.switchLink}>
                  {t('signUp', currentLanguage)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rtlContainer: {
    transform: [{ scaleX: -1 }],
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  mainContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
  },
  content: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderRadius: 24,
    padding: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  rtlContent: {
    transform: [{ scaleX: -1 }],
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E2E8F0',
    textAlign: 'left',
  },
  rtlText: {
    textAlign: 'right',
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputFocused: {
    borderColor: '#6366F1',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  input: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  rtlInput: {
    textAlign: 'right',
  },
  forgotPassword: {
    alignSelf: 'flex-start',
  },
  rtlForgot: {
    alignSelf: 'flex-end',
  },
  forgotText: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 10,
  },
  gradientButton: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 8,
  },
  rtlSwitch: {
    flexDirection: 'row-reverse',
  },
  switchText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  switchLink: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: 'bold',
  },
});