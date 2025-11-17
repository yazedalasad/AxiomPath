import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomButton from '../../components/Form/CustomButton';
import CustomTextInput from '../../components/Form/CustomTextInput';
import { supabase } from '../../config/supabase';
import { validateEmail } from '../../utils/validation';

export default function ForgotPasswordScreen({ navigateTo }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendCode = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://your-app-url.com/reset-password',
      });

      setLoading(false);

      if (error) {
        throw error;
      }

      Alert.alert(
        'تم الإرسال!',
        'تم إرسال رمز التحقق المكون من 6 أرقام إلى بريدك الإلكتروني',
        [
          {
            text: 'حسناً',
            onPress: () => navigateTo('verifyCode', { email }),
          },
        ]
      );
    } catch (error) {
      setLoading(false);
      let errorMessage = 'حدث خطأ أثناء إرسال رمز التحقق';
      
      if (error.message.includes('User not found')) {
        errorMessage = 'البريد الإلكتروني غير مسجل';
      }

      Alert.alert('خطأ', errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <LinearGradient
          colors={['#27ae60', '#2ecc71']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.logoContainer}>
            <FontAwesome name="lock" size={60} color="#fff" />
          </View>
          <Text style={styles.title}>{t('auth.forgotPassword.title')}</Text>
          <Text style={styles.subtitle}>
            {t('auth.forgotPassword.subtitle')}
          </Text>
        </LinearGradient>

        <View style={styles.formContainer}>
          <View style={styles.infoBox}>
            <FontAwesome name="info-circle" size={20} color="#27ae60" />
            <Text style={styles.infoText}>
              {t('auth.forgotPassword.info')}
            </Text>
          </View>

          <CustomTextInput
            label={t('auth.forgotPassword.email')}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) {
                setErrors({ ...errors, email: null });
              }
            }}
            placeholder="example@gmail.com"
            icon="envelope"
            keyboardType="email-address"
            error={errors.email}
          />

          <CustomButton
            title={t('auth.forgotPassword.sendCode')}
            onPress={handleSendCode}
            icon="paper-plane"
            loading={loading}
          />

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigateTo('login')}
          >
            <FontAwesome name="arrow-right" size={16} color="#64748b" />
            <Text style={styles.backButtonText}>{t('auth.forgotPassword.backToLogin')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: '#86efac',
  },
  infoText: {
    flex: 1,
    color: '#166534',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'right',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    marginTop: 16,
  },
  backButtonText: {
    color: '#64748b',
    fontSize: 14,
  },
});
