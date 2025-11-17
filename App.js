import { I18nextProvider } from 'react-i18next';
import { I18nManager } from 'react-native';
import { AuthProvider } from './contexts/AuthContext';
import i18n from './i18n/config'; // Initialize i18n
import ManualNavigator from './navigation/ManualNavigator';

// Set initial RTL based on default language
const defaultLanguage = 'ar';
const isRTL = defaultLanguage === 'ar' || defaultLanguage === 'he';
I18nManager.forceRTL(isRTL);

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <ManualNavigator />
      </AuthProvider>
    </I18nextProvider>
  );
}
