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
  createStudentAccount: { en: 'Create Student Account', ar: 'إنشاء حساب طالب', he: 'יצירת חשבון סטודנט' },
  joinPlatform: { en: 'Join the career discovery platform', ar: 'انضم إلى منصة اكتشاف المسار المهني', he: 'הצטרף לפלטפורמת גילוי הקריירה' },
  
  // Buttons
  login: { en: 'Sign In', ar: 'تسجيل الدخول', he: 'כניסה' },
  signup: { en: 'Sign Up', ar: 'إنشاء حساب', he: 'הרשמה' },
  signingIn: { en: 'Signing In...', ar: 'جاري التسجيل...', he: 'מתחבר...' },
  signingUp: { en: 'Creating Account...', ar: 'جاري إنشاء الحساب...', he: 'יוצר חשבון...' },
  createStudentAccountBtn: { en: 'Create Student Account', ar: 'إنشاء حساب طالب', he: 'יצירת חשבון סטודנט' },
  
  // Links
  forgotPassword: { en: 'Forgot Password?', ar: 'نسيت كلمة المرور؟', he: 'שכחת סיסמה?' },
  noAccount: { en: "Don't have an account?", ar: "ليس لديك حساب؟", he: "אין לך חשבון?" },
  hasAccount: { en: "Already have an account?", ar: "لديك حساب بالفعل؟", he: "כבר יש לך חשבון?" },
  signIn: { en: "Sign In", ar: "سجل الدخول", he: "היכנס" }
};

// 2. FORM FIELD TRANSLATIONS
const formTranslations = {
  email: { en: 'Email', ar: 'البريد الإلكتروني', he: 'אימייל' },
  password: { en: 'Password', ar: 'كلمة المرور', he: 'סיסמה' },
  firstName: { en: 'First Name', ar: 'الاسم الأول', he: 'שם פרטי' },
  lastName: { en: 'Last Name', ar: 'اسم العائلة', he: 'שם משפחה' },
  phone: { en: 'Phone', ar: 'رقم الهاتف', he: 'טלפון' },
  studentId: { en: 'Student ID', ar: 'رقم الطالب', he: 'תעודת זהות סטודנט' },
  israeliId: { en: 'Israeli ID', ar: 'رقم الهوية الإسرائيلية', he: 'תעודת זהות' },
  dateOfBirth: { en: 'Date of Birth', ar: 'تاريخ الميلاد', he: 'תאריך לידה' },
  confirmPassword: { en: 'Confirm Password', ar: 'تأكيد كلمة المرور', he: 'אשר סיסמה' },
  
  // NEW: Identifier field for login
  identifier: { en: 'Email, Phone, or Israeli ID', ar: 'البريد الإلكتروني، الهاتف، أو رقم الهوية', he: 'אימייל, טלפון, או תעודת זהות' },
  
  // Placeholders
  emailPlaceholder: { en: 'Enter your email', ar: 'أدخل بريدك الإلكتروني', he: 'הזן את האימייל שלך' },
  passwordPlaceholder: { en: 'Enter your password', ar: 'أدخل كلمة المرور', he: 'הזן את הסיסמה שלך' },
  firstNamePlaceholder: { en: 'Enter your first name', ar: 'أدخل اسمك الأول', he: 'הזן את שמך הפרטי' },
  lastNamePlaceholder: { en: 'Enter your last name', ar: 'أدخل اسم العائلة', he: 'הזן את שם המשפחה שלך' },
  phonePlaceholder: { en: 'Enter your phone number', ar: 'أدخل رقم هاتفك', he: 'הזן את מספר הטלפון שלך' },
  studentIdPlaceholder: { en: 'Enter your student ID', ar: 'أدخل رقم الطالب', he: 'הזן את תעודת הזהות הסטודנט' },
  israeliIdPlaceholder: { en: 'Enter your Israeli ID', ar: 'أدخل رقم الهوية الإسرائيلية', he: 'הזן את תעודת הזהות שלך' },
  dateOfBirthPlaceholder: { en: 'YYYY-MM-DD', ar: 'السنة-الشهر-اليوم', he: 'שנה-חודש-יום' },
  confirmPasswordPlaceholder: { en: 'Confirm your password', ar: 'أكد كلمة المرور', he: 'אשר את הסיסמה שלך' },
  identifierPlaceholder: { en: 'email@example.com or +9725... or 123456789', ar: 'email@example.com أو +9725... أو 123456789', he: 'email@example.com או +9725... או 123456789' },
  
  // NEW: Smart detection messages
  phoneDetected: { en: '📱 Phone detected', ar: '📱 تم اكتشاف رقم الهاتف', he: '📱 זוהה טלפון' },
  israeliIdDetected: { en: '🆔 Israeli ID detected', ar: '🆔 تم اكتشاف رقم الهوية', he: '🆔 זוהתה תעודת זהות' },
  emailDetected: { en: '📧 Email detected', ar: '📧 تم اكتشاف البريد الإلكتروني', he: '📧 זוהה אימייל' },
  enterIdentifier: { en: 'Enter email, phone, or ID', ar: 'أدخل البريد الإلكتروني، الهاتف، أو الرقم', he: 'הזן אימייל, טלפון, או מספר' }
};

// 3. ERROR & VALIDATION TRANSLATIONS
const errorTranslations = {
  fillAllFields: { en: 'Please fill all fields', ar: 'يرجى ملء جميع الحقول', he: 'אנא מלא את כל השדות' },
  fillRequiredFields: { en: 'Please fill all required fields', ar: 'يرجى ملء جميع الحقول المطلوبة', he: 'אנא מלא את כל השדות הנדרשים' },
  passwordsDontMatch: { en: 'Passwords do not match', ar: 'كلمات المرور غير متطابقة', he: 'הסיסמאות אינן תואמות' },
  invalidEmail: { en: 'Please enter a valid email', ar: 'يرجى إدخال بريد إلكتروني صحيح', he: 'אנא הזן אימייל תקין' },
  invalidPhone: { en: 'Phone must be in format: +9725XXXXXXXX', ar: 'يجب أن يكون رقم الهاتف بالصيغة: +9725XXXXXXXX', he: 'הטלפון חייב להיות בפורמט: +9725XXXXXXXX' },
  phoneNotFound: { en: 'Phone number not found', ar: 'رقم الهاتف غير موجود', he: 'מספר הטלפון לא נמצא' },
  israeliIdNotFound: { en: 'Israeli ID not found', ar: 'رقم الهوية غير موجود', he: 'תעודת הזהות לא נמצאה' },
  invalidIsraeliId: { en: 'Invalid Israeli ID number', ar: 'رقم الهوية الإسرائيلية غير صالح', he: 'מספר תעודת זהות לא תקין' },
  accountCreated: { en: 'Account created successfully!', ar: 'تم إنشاء الحساب بنجاح!', he: 'החשבון נוצר בהצלחה!' },
  studentAccountCreated: { en: 'Student account created successfully!', ar: 'تم إنشاء حساب الطالب بنجاح!', he: 'חשבון הסטודנט נוצר בהצלחה!' }
};

// 4. USER TYPE TRANSLATIONS
const userTypeTranslations = {
  student: { en: 'Student', ar: 'طالب', he: 'סטודנט' },
  principal: { en: 'Principal', ar: 'مدير المدرسة', he: 'מנהל בית ספר' },
  ministryOfficial: { en: 'Ministry Official', ar: 'مسؤول الوزارة', he: 'נציג משרד החינוך' },
  studentDashboard: { en: 'Student Dashboard', ar: 'لوحة تحكم الطالب', he: 'לוח מחוונים לסטודנט' },
  principalDashboard: { en: 'Principal Dashboard', ar: 'لوحة تحكم المدير', he: 'לוח מחוונים למנהל' },
  ministryDashboard: { en: 'Ministry Dashboard', ar: 'لوحة تحكم الوزارة', he: 'לוח מחוונים למשרד' }
};

// ========================
// EASY EXPANSION SYSTEM
// ========================

// COMBINE ALL TRANSLATIONS (automatically merges everything)
export const translations = {
  ...authTranslations,
  ...formTranslations, 
  ...errorTranslations,
  ...userTypeTranslations
  // ADD NEW SECTIONS HERE: ...yourNewSection
};

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