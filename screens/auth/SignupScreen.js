import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../../contexts/LanguageContext';
import { t } from '../../utils/languages';
import { signUp } from '../../services/authService';

const { width } = Dimensions.get('window');

export default function SignupScreen({ onSwitchToLogin, navigateTo }) {
  const { currentLanguage, textDirection } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    studentId: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSignup = async () => {
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.password || !formData.confirmPassword) {
      alert(t('fillAllFields', currentLanguage));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert(t('passwordsDontMatch', currentLanguage));
      return;
    }

    setLoading(true);
    
    try {
      const result = await signUp({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        studentId: formData.studentId,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });

      if (result.success) {
        alert('Account created successfully!');
        // Navigate to login or dashboard
        onSwitchToLogin();
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert('Signup failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const isRTL = textDirection === 'rtl';

  return (
    <View style={[styles.container, isRTL && styles.rtlContainer]}>
      {/* Gradient Background */}
      <LinearGradient
        colors={['#EC4899', '#8B5CF6', '#6366F1']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Main Container */}
      <View style={styles.mainContainer}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.content, isRTL && styles.rtlContent]}>
            
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>
                {t('createAccount', currentLanguage)}
              </Text>
              <Text style={styles.subtitle}>
                {t('signupSubtitle', currentLanguage)}
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {/* Name Row */}
              <View style={styles.row}>
                <View style={[styles.inputGroup, styles.halfInput]}>
                  <Text style={[styles.label, isRTL && styles.rtlText]}>
                    {t('firstName', currentLanguage)}
                  </Text>
                  <View style={[
                    styles.inputContainer,
                    focusedField === 'firstName' && styles.inputFocused
                  ]}>
                    <TextInput
                      style={[styles.input, isRTL && styles.rtlInput]}
                      placeholder={t('firstNamePlaceholder', currentLanguage)}
                      placeholderTextColor="#64748B"
                      value={formData.firstName}
                      onChangeText={(text) => setFormData({...formData, firstName: text})}
                      onFocus={() => setFocusedField('firstName')}
                      onBlur={() => setFocusedField(null)}
                      autoCapitalize="words"
                    />
                  </View>
                </View>

                <View style={[styles.inputGroup, styles.halfInput]}>
                  <Text style={[styles.label, isRTL && styles.rtlText]}>
                    {t('lastName', currentLanguage)}
                  </Text>
                  <View style={[
                    styles.inputContainer,
                    focusedField === 'lastName' && styles.inputFocused
                  ]}>
                    <TextInput
                      style={[styles.input, isRTL && styles.rtlInput]}
                      placeholder={t('lastNamePlaceholder', currentLanguage)}
                      placeholderTextColor="#64748B"
                      value={formData.lastName}
                      onChangeText={(text) => setFormData({...formData, lastName: text})}
                      onFocus={() => setFocusedField('lastName')}
                      onBlur={() => setFocusedField(null)}
                      autoCapitalize="words"
                    />
                  </View>
                </View>
              </View>

              {/* Email */}
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

              {/* Phone & Student ID Row */}
              <View style={styles.row}>
                <View style={[styles.inputGroup, styles.halfInput]}>
                  <Text style={[styles.label, isRTL && styles.rtlText]}>
                    {t('phone', currentLanguage)}
                  </Text>
                  <View style={[
                    styles.inputContainer,
                    focusedField === 'phone' && styles.inputFocused
                  ]}>
                    <TextInput
                      style={[styles.input, isRTL && styles.rtlInput]}
                      placeholder={t('phonePlaceholder', currentLanguage)}
                      placeholderTextColor="#64748B"
                      value={formData.phone}
                      onChangeText={(text) => setFormData({...formData, phone: text})}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>

                <View style={[styles.inputGroup, styles.halfInput]}>
                  <Text style={[styles.label, isRTL && styles.rtlText]}>
                    {t('studentId', currentLanguage)}
                  </Text>
                  <View style={[
                    styles.inputContainer,
                    focusedField === 'studentId' && styles.inputFocused
                  ]}>
                    <TextInput
                      style={[styles.input, isRTL && styles.rtlInput]}
                      placeholder={t('studentIdPlaceholder', currentLanguage)}
                      placeholderTextColor="#64748B"
                      value={formData.studentId}
                      onChangeText={(text) => setFormData({...formData, studentId: text})}
                      onFocus={() => setFocusedField('studentId')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </View>
                </View>
              </View>

              {/* Password */}
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

              {/* Confirm Password */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, isRTL && styles.rtlText]}>
                  Confirm Password
                </Text>
                <View style={[
                  styles.inputContainer,
                  focusedField === 'confirmPassword' && styles.inputFocused
                ]}>
                  <TextInput
                    style={[styles.input, isRTL && styles.rtlInput]}
                    placeholder="Confirm your password"
                    placeholderTextColor="#64748B"
                    secureTextEntry
                    value={formData.confirmPassword}
                    onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>
              </View>

              {/* Signup Button */}
              <TouchableOpacity 
                style={[styles.signupButton, loading && styles.buttonDisabled]}
                onPress={handleSignup}
                disabled={loading}
              >
                <LinearGradient
                  colors={['#EC4899', '#8B5CF6']}
                  style={styles.gradientButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.signupButtonText}>
                    {loading ? t('signingUp', currentLanguage) : t('signup', currentLanguage)}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Switch to Login */}
              <View style={[styles.switchContainer, isRTL && styles.rtlSwitch]}>
                <Text style={styles.switchText}>
                  {t('hasAccount', currentLanguage)}
                </Text>
                <TouchableOpacity onPress={onSwitchToLogin}>
                  <Text style={styles.switchLink}>
                    {t('signIn', currentLanguage)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
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
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
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
    marginBottom: 30,
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
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  inputGroup: {
    gap: 8,
  },
  halfInput: {
    flex: 1,
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
    borderColor: '#8B5CF6',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  input: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  rtlInput: {
    textAlign: 'right',
  },
  signupButton: {
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
  signupButtonText: {
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
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: 'bold',
  },
});