// Language configurations with RTL support
export const languages = {
  en: { code: 'en', name: 'English', dir: 'ltr', flag: '🇺🇸' },
  ar: { code: 'ar', name: 'العربية', dir: 'rtl', flag: '🇸🇦' },
  he: { code: 'he', name: 'עברית', dir: 'rtl', flag: '🇮🇱' }
};

// ========================
// TRANSLATION SECTIONS
// ========================

// 1. AUTH TRANSLATIONS
const authTranslations = {
  welcomeBack: { en: 'Welcome Back', ar: 'مرحباً بعودتك', he: 'ברוך שובך' },
  loginSubtitle: { en: 'Sign in to continue your journey', ar: 'سجل الدخول لمواصلة رحلتك', he: 'היכנס כדי להמשיך במסע שלך' },
  createAccount: { en: 'Create Account', ar: 'إنشاء حساب جديد', he: 'יצירת חשבון' },
  signupSubtitle: { en: 'Start your career discovery journey', ar: 'ابدأ رحلة اكتشاف مسارك المهني', he: 'התחל את מסע גילוי הקריירה שלך' },
  
  // Buttons
  login: { en: 'Sign In', ar: 'تسجيل الدخول', he: 'כניסה' },
  signup: { en: 'Sign Up', ar: 'إنشاء حساب', he: 'הרשמה' },
  signingIn: { en: 'Signing In...', ar: 'جاري التسجيل...', he: 'מתחבר...' },
  signingUp: { en: 'Creating Account...', ar: 'جاري إنشاء الحساب...', he: 'יוצר חשבון...' },
  
  // Links
  forgotPassword: { en: 'Forgot Password?', ar: 'نسيت كلمة المرور؟', he: 'שכחת סיסמה?' },
  noAccount: { en: "Don't have an account?", ar: "ليس لديك حساب؟", he: "אין לך חשבון?" },
  hasAccount: { en: "Already have an account?", ar: "لديك حساب بالفعل؟", he: "כבר יש לך חשבון?" }
};

// 2. FORM FIELD TRANSLATIONS
const formTranslations = {
  email: { en: 'Email', ar: 'البريد الإلكتروني', he: 'אימייל' },
  password: { en: 'Password', ar: 'كلمة المرور', he: 'סיסמה' },
  firstName: { en: 'First Name', ar: 'الاسم الأول', he: 'שם פרטי' },
  lastName: { en: 'Last Name', ar: 'اسم العائلة', he: 'שם משפחה' },
  phone: { en: 'Phone', ar: 'رقم الهاتف', he: 'טלפון' },
  studentId: { en: 'Student ID', ar: 'رقم الطالب', he: 'תעודת זהות סטודנט' },
  
  // Placeholders - JUST COPY-PASTE NEW ONES HERE
  emailPlaceholder: { en: 'Enter your email', ar: 'أدخل بريدك الإلكتروني', he: 'הזן את האימייל שלך' },
  passwordPlaceholder: { en: 'Enter your password', ar: 'أدخل كلمة المرور', he: 'הזן את הסיסמה שלך' },
  firstNamePlaceholder: { en: 'Enter your first name', ar: 'أدخل اسمك الأول', he: 'הזן את שמך הפרטי' },
  lastNamePlaceholder: { en: 'Enter your last name', ar: 'أدخل اسم العائلة', he: 'הזן את שם המשפחה שלך' },
  phonePlaceholder: { en: 'Enter your phone number', ar: 'أدخل رقم هاتفك', he: 'הזן את מספר הטלפון שלך' },
  studentIdPlaceholder: { en: 'Enter your student ID', ar: 'أدخل رقم الطالب', he: 'הזן את תעודת הזהות הסטודנט' }
};

// 3. ERROR & VALIDATION TRANSLATIONS
const errorTranslations = {
  fillAllFields: { en: 'Please fill all fields', ar: 'يرجى ملء جميع الحقول', he: 'אנא מלא את כל השדות' },
  passwordsDontMatch: { en: 'Passwords do not match', ar: 'كلمات المرور غير متطابقة', he: 'הסיסמאות אינן תואמות' },
  invalidEmail: { en: 'Please enter a valid email', ar: 'يرجى إدخال بريد إلكتروني صحيح', he: 'אנא הזן אימייל תקין' }
};

// ========================
// EASY EXPANSION SYSTEM
// ========================

// COMBINE ALL TRANSLATIONS (automatically merges everything)
export const translations = {
  ...authTranslations,
  ...formTranslations, 
  ...errorTranslations
  // ADD NEW SECTIONS HERE: ...yourNewSection
};

// ========================
// ADD NEW TRANSLATIONS HERE - JUST COPY-PASTE FORMAT:
// ========================

/*
// EXAMPLE: Adding new translations for career discovery
const careerTranslations = {
  exploreCareers: { en: 'Explore Careers', ar: 'استكشاف المهن', he: 'גלה קריירות' },
  findYourPath: { en: 'Find Your Path', ar: 'ابحث عن مسارك', he: 'מצא את הדרך שלך' },
  // ADD MORE HERE...
};

// Then add to the combined translations:
// ...careerTranslations
*/

// ========================
// HELPER FUNCTIONS
// ========================

export const getTextDirection = (languageCode) => {
  return languages[languageCode]?.dir || 'ltr';
};

export const t = (key, languageCode) => {
  return translations[key]?.[languageCode] || translations[key]?.en || key;
};

// ========================
// QUICK ADD FUNCTION - SUPER EASY!
// ========================

// Use this function to quickly test new translations
export const quickAdd = (key, english, arabic, hebrew) => {
  translations[key] = {
    en: english,
    ar: arabic, 
    he: hebrew
  };
};

// EXAMPLE USAGE:
// quickAdd('welcomeMessage', 'Welcome!', 'أهلاً وسهلاً!', 'ברוך הבא!');
// quickAdd('dashboard', 'Dashboard', 'لوحة التحكم', 'לוח מחוונים');