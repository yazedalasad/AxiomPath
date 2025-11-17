# Internationalization (i18n) Implementation Guide

## 🌍 Overview

The app now supports multiple languages (Arabic and Hebrew) using react-i18next. Users can switch between languages using the language switcher in the navbar.

---

## 📁 Files Created

### 1. **i18n/config.js**
- Initializes i18next
- Configures available languages
- Sets default language to Arabic

### 2. **i18n/translations/ar.json**
- Complete Arabic translations
- All screens and components
- Validation messages
- Error messages

### 3. **i18n/translations/he.json**
- Complete Hebrew translations
- All screens and components
- Validation messages
- Error messages

### 4. **components/LanguageSwitcher.js**
- Language selection modal
- Flag icons for each language
- RTL/LTR direction handling
- Restart notification when needed

---

## 🔧 Files Modified

### 1. **App.js**
- Added i18n initialization import
- Must be imported before any components

### 2. **components/Navigation/Navbar.js**
- Added LanguageSwitcher component
- Updated tab labels to use translations
- Now shows language switcher above tabs

---

## 🎯 How to Use Translations in Components

### Basic Usage:

```javascript
import { useTranslation } from 'react-i18next';

export default function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <Text>{t('home.title')}</Text>
  );
}
```

### With Variables:

```javascript
const { t } = useTranslation();

<Text>{t('home.welcome', { name: studentData.first_name })}</Text>
// Arabic: مرحباً أحمد!
// Hebrew: שלום אחמד!
```

### Changing Language:

```javascript
import { useTranslation } from 'react-i18next';

const { i18n } = useTranslation();

// Change to Hebrew
i18n.changeLanguage('he');

// Change to Arabic
i18n.changeLanguage('ar');

// Get current language
const currentLang = i18n.language; // 'ar' or 'he'
```

---

## 📝 Translation Keys Structure

### Common Keys:
```json
{
  "common": {
    "appName": "I3dad",
    "loading": "Loading...",
    "error": "Error",
    "success": "Success!",
    "back": "Back",
    "submit": "Submit"
  }
}
```

### Home Page Keys:
```json
{
  "home": {
    "title": "I3dad",
    "subtitle": "Discover your passion...",
    "mission": {
      "title": "Our Mission",
      "description": "..."
    },
    "features": {
      "title": "Everything you need...",
      "careerDiscovery": {
        "title": "...",
        "description": "..."
      }
    }
  }
}
```

### Auth Keys:
```json
{
  "auth": {
    "login": {
      "title": "Welcome back!",
      "email": "Email",
      "password": "Password",
      "errors": {
        "invalidCredentials": "..."
      }
    }
  }
}
```

---

## 🔄 RTL/LTR Support

### Automatic Direction:
The app automatically handles text direction based on the selected language:
- **Arabic**: RTL (Right-to-Left)
- **Hebrew**: RTL (Right-to-Left)

### Force RTL:
```javascript
import { I18nManager } from 'react-native';

// Check if RTL is enabled
const isRTL = I18nManager.isRTL;

// Force RTL
I18nManager.forceRTL(true);

// Force LTR
I18nManager.forceRTL(false);
```

**Note:** Changing RTL/LTR requires app restart to take effect.

---

## 🎨 Language Switcher Features

### Location:
- Displayed in the Navbar
- Above the navigation tabs
- Always visible when navbar is shown

### Features:
- 🇵🇸 Arabic flag
- 🇮🇱 Hebrew flag
- Modal selection interface
- Current language indicator
- Restart notification when needed

### Usage:
1. Click the language button in navbar
2. Modal opens with language options
3. Select desired language
4. App switches immediately
5. If RTL change needed, shows restart note

---

## 📱 Updating Screens to Use Translations

### Example: HomeScreen

**Before:**
```javascript
<Text style={styles.heroTitle}>I3dad</Text>
<Text style={styles.heroSubtitle}>
  اكتشف شغفك، شكل مستقبلك
</Text>
```

**After:**
```javascript
import { useTranslation } from 'react-i18next';

export default function HomeScreen({ navigateTo }) {
  const { t } = useTranslation();
  
  return (
    <Text style={styles.heroTitle}>{t('home.title')}</Text>
    <Text style={styles.heroSubtitle}>
      {t('home.subtitle')}
    </Text>
  );
}
```

### Example: LoginScreen

**Before:**
```javascript
<Text style={styles.title}>مرحباً بعودتك!</Text>
<CustomTextInput
  label="البريد الإلكتروني"
  placeholder="example@gmail.com"
/>
```

**After:**
```javascript
import { useTranslation } from 'react-i18next';

export default function LoginScreen({ navigateTo }) {
  const { t } = useTranslation();
  
  return (
    <Text style={styles.title}>{t('auth.login.title')}</Text>
    <CustomTextInput
      label={t('auth.login.email')}
      placeholder="example@gmail.com"
    />
  );
}
```

---

## 🔍 Translation Keys Reference

### Home Page:
- `home.title` - App name
- `home.subtitle` - Main tagline
- `home.description` - Hero description
- `home.getStarted` - CTA button
- `home.mission.title` - Mission section title
- `home.mission.description` - Mission text
- `home.features.title` - Features section title
- `home.pathways.title` - Pathways section title
- `home.successStories.title` - Success stories title
- `home.cta.title` - Final CTA title

### Authentication:
- `auth.login.title` - Login page title
- `auth.login.email` - Email field label
- `auth.login.password` - Password field label
- `auth.login.forgotPassword` - Forgot password link
- `auth.signup.title` - Signup page title
- `auth.forgotPassword.title` - Forgot password title
- `auth.verifyCode.title` - Verify code title
- `auth.resetPassword.title` - Reset password title

### Validation:
- `validation.required` - Required field error
- `validation.invalidEmail` - Invalid email error
- `validation.passwordTooShort` - Password too short
- `validation.passwordsNotMatch` - Passwords don't match

### Navigation:
- `nav.home` - Home tab
- `nav.assessment` - Assessment tab
- `nav.profile` - Profile tab

---

## 🚀 Implementation Steps for Each Screen

### Step 1: Import useTranslation
```javascript
import { useTranslation } from 'react-i18next';
```

### Step 2: Get translation function
```javascript
const { t } = useTranslation();
```

### Step 3: Replace hardcoded text
```javascript
// Before
<Text>مرحباً</Text>

// After
<Text>{t('common.welcome')}</Text>
```

### Step 4: Test both languages
- Switch to Hebrew
- Verify all text displays correctly
- Check RTL layout
- Switch back to Arabic
- Verify everything works

---

## 📋 Screens to Update

### Priority 1 (Main Screens):
- [x] Navbar (DONE)
- [ ] HomeScreen
- [ ] LoginScreen
- [ ] SignupScreen
- [ ] ForgotPasswordScreen
- [ ] VerifyCodeScreen
- [ ] ResetPasswordScreen

### Priority 2 (Components):
- [ ] FeatureCard
- [ ] StudentCard
- [ ] CustomTextInput
- [ ] CustomButton
- [ ] CustomPicker
- [ ] DatePicker

### Priority 3 (Other):
- [ ] Profile Screen
- [ ] Assessment Screen (when created)

---

## 🎯 Best Practices

### 1. Always use translation keys
```javascript
// ❌ Bad
<Text>مرحباً</Text>

// ✅ Good
<Text>{t('common.welcome')}</Text>
```

### 2. Keep keys organized
```javascript
// ❌ Bad
t('welcomeMessage')

// ✅ Good
t('home.welcome')
```

### 3. Use variables for dynamic content
```javascript
// ✅ Good
t('home.welcome', { name: user.name })
```

### 4. Provide fallback text
```javascript
// ✅ Good
t('home.title', 'I3dad')
```

### 5. Test both languages
- Always test in both Arabic and Hebrew
- Check RTL layout
- Verify text doesn't overflow
- Test on different screen sizes

---

## 🐛 Troubleshooting

### Translation not showing:
1. Check if key exists in both ar.json and he.json
2. Verify import: `import { useTranslation } from 'react-i18next';`
3. Check if i18n is initialized in App.js
4. Restart the app

### RTL not working:
1. Check I18nManager.isRTL
2. Force RTL: `I18nManager.forceRTL(true)`
3. Restart the app (required for RTL changes)

### Language not switching:
1. Check if changeLanguage is called correctly
2. Verify language code ('ar' or 'he')
3. Check console for errors
4. Restart the app

---

## 📦 Dependencies

Already installed in package.json:
- `i18next`: ^25.6.2
- `react-i18next`: ^16.2.4

No additional installation needed!

---

## ✅ Testing Checklist

- [ ] Language switcher appears in navbar
- [ ] Can switch between Arabic and Hebrew
- [ ] Text changes when language switches
- [ ] RTL layout works for both languages
- [ ] All screens display correctly in both languages
- [ ] Validation messages show in correct language
- [ ] Error messages show in correct language
- [ ] Navigation labels update
- [ ] User data displays correctly
- [ ] Forms work in both languages

---

## 🎉 Summary

The i18n system is now set up and ready to use! 

**What's Done:**
- ✅ i18n configuration
- ✅ Arabic translations (complete)
- ✅ Hebrew translations (complete)
- ✅ Language switcher component
- ✅ Navbar integration
- ✅ RTL/LTR support

**Next Steps:**
1. Update each screen to use `t()` function
2. Replace hardcoded text with translation keys
3. Test in both languages
4. Verify RTL layout

**How to Use:**
```javascript
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
<Text>{t('home.title')}</Text>
```

Users can now switch between Arabic and Hebrew using the language switcher in the navbar!
