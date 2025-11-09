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
  signUp: { en: 'Sign Up', ar: 'إنشاء حساب', he: 'הרשמה' },
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
// Add these to your translations object
const TestTranslations = {
  // Test instructions
  smartTest: { en: 'Smart Career Test', ar: 'اختبار المسار الذكي', he: 'מבחן קריירה חכם' },
  testDescription: { en: 'Discover your strengths and interests', ar: 'اكتشف نقاط قوتك واهتماماتك', he: 'גלה את החוזקות והתחומי העניין שלך' },
  instruction1: { en: 'Answer honestly - no right or wrong answers', ar: 'أجب بصدق - لا توجد إجابات صحيحة أو خاطئة', he: 'ענה בכנות - אין תשובות נכונות או שגויות' },
  instruction2: { en: 'Take your time with each question', ar: 'خذ وقتك مع كل سؤال', he: 'קח את הזמן עם כל שאלה' },
  instruction3: { en: 'Choose "I don\'t know" if unsure', ar: 'اختر "لا أعرف" إذا كنت غير متأكد', he: 'בחר "אני לא יודע" אם אינך בטוח' },
  instruction4: { en: 'The test adapts to your answers', ar: 'الاختبار يتكيف مع إجاباتك', he: 'המבחן מותאם לתשובות שלך' },
  
  // Test buttons
  startTest: { en: 'Start Smart Test', ar: 'بدء الاختبار الذكي', he: 'התחל מבחן חכם' },
  nextQuestion: { en: 'Next Question', ar: 'السؤال التالي', he: 'שאלה הבאה' },
  submitAnswer: { en: 'Submit Answer', ar: 'إرسال الإجابة', he: 'שלח תשובה' },
  
  // Test messages
  startingTest: { en: 'Starting test...', ar: 'جاري بدء الاختبار...', he: 'מתחיל מבחן...' },
  gettingQuestion: { en: 'Getting question...', ar: 'جاري تحميل السؤال...', he: 'טוען שאלה...' },
  submittingAnswer: { en: 'Submitting answer...', ar: 'جاري إرسال الإجابة...', he: 'שולח תשובה...' },
  testSessionCreated: { en: 'Test session created:', ar: 'تم إنشاء جلسة الاختبار:', he: 'סשן מבחן נוצר:' },
  questionLoaded: { en: 'Question loaded:', ar: 'تم تحميل السؤال:', he: 'שאלה נטענה:' },
  answerSubmitted: { en: 'Answer submitted:', ar: 'تم إرسال الإجابة:', he: 'תשובה נשלחה:' },
  
  // Feedback messages
  quickAndCorrect: { en: 'Great! Quick and correct!', ar: 'ممتاز! سريع وصحيح!', he: 'מצוין! מהיר ונכון!' },
  correctAnswer: { en: 'Correct! Well done!', ar: 'صحيح! أحسنت!', he: 'נכון! כל הכבוד!' },
  admitDontKnow: { en: 'Honest answer - we will help you learn!', ar: 'إجابة صادقة - سنساعدك على التعلم!', he: 'תשובה כנה - נעזור לך ללמוד!' },
  incorrectTryAgain: { en: 'Good try! Let\'s continue learning', ar: 'محاولة جيدة! دعنا نواصل التعلم', he: 'ניסיון טוב! בוא נמשיך ללמוד' },
  
  // Error messages
  errorStartingTest: { en: 'Error starting test:', ar: 'خطأ في بدء الاختبار:', he: 'שגיאה בהתחלת המבחן:' },
  errorGettingQuestion: { en: 'Error getting question:', ar: 'خطأ في تحميل السؤال:', he: 'שגיאה בטעינת השאלה:' },
  errorSubmittingAnswer: { en: 'Error submitting answer:', ar: 'خطأ في إرسال الإجابة:', he: 'שגיאה בשליחת התשובה:' }

  ,howItWorks: { en: 'How It Works', ar: 'كيف يعمل', he: 'איך זה עובד' },
  learnMore: { en: 'Learn More', ar: 'تعلم المزيد', he: 'למד עוד' },
  explanation: { en: 'Explanation', ar: 'شرح', he: 'הסבר' },
  difficulty: { en: 'Difficulty', ar: 'الصعوبة', he: 'קושי' },
  testComplete: { en: 'Test Complete!', ar: 'تم الانتهاء من الاختبار!', he: 'המבחן הושלם!' },
  discoverYourPotential: { en: 'Discover Your Potential', ar: 'اكتشف إمكانياتك', he: 'גלה את הפוטנציאל שלך' },
  yourResults: { en: 'Your Results', ar: 'نتائجك', he: 'התוצאות שלך' },
  potentialMatch: { en: 'Potential Match', ar: 'تطابق محتمل', he: 'התאמה פוטנציאלית' },
  topStrengths: { en: 'Top Strengths', ar: 'أهم نقاط القوة', he: 'חוזקות עיקריות' },
  careerSuggestions: { en: 'Career Suggestions', ar: 'اقتراحات مهنية', he: 'הצעות קריירה' },
  viewDetailedReport: { en: 'View Detailed Report', ar: 'عرض التقرير المفصل', he: 'צפה בדוח מפורט' },
  retakeTest: { en: 'Retake Test', ar: 'إعادة الاختبار', he: 'בצע מבחן מחדש' },
of: { en: 'of', ar: 'من', he: 'מתוך' },
  greatStart: { en: 'Great start! Keep going!', ar: 'بداية رائعة! استمر!', he: 'התחלה מצוינת! המשיך!' },
  keepGoing: { en: 'You\'re doing great! Keep going!', ar: 'أنت تبلي بلاءً حسناً! استمر!', he: 'אתה מצוין! המשיך!' },
  almostThere: { en: 'Almost there! You\'re amazing!', ar: 'كدت تصل! أنت مذهل!', he: 'כמעט שם! אתה מדהים!' },
  finalPush: { en: 'Final push! You\'ve got this!', ar: 'الدفعة الأخيرة! يمكنك فعلها!', he: 'דחיפה אחרונה! אתה יכול!' },
  
  // Learning Module
  learningTime: { en: 'Learning Time!', ar: 'وقت التعلم!', he: 'זמן learning!' },
  realWorldApplication: { en: 'Real World Application', ar: 'التطبيق في العالم الحقيقي', he: 'יישום בעולם האמיתי' },
  careerConnections: { en: 'Career Connections', ar: 'الاتصالات المهنية', he: 'קשרי קריירה' },
  researchScience: { en: 'Research & Science', ar: 'البحث والعلوم', he: 'מחקר ומדע' },
  technology: { en: 'Technology', ar: 'التكنولوجيا', he: 'טכנולוגיה' },
  dataAnalysis: { en: 'Data Analysis', ar: 'تحليل البيانات', he: 'ניתוח נתונים' },
  learningTips: { en: 'Learning Tips', ar: 'نصائح التعلم', he: 'טיפים ללמידה' },
  tip1: { en: 'Practice regularly to build skills', ar: 'تمرن بانتظام لبناء المهارات', he: 'התאמן באופן קבוע כדי לבנות כישורים' },
  tip2: { en: 'Connect concepts to real life', ar: 'اربط المفاهيم بالحياة الواقعية', he: 'חבר מושגים לחיים האמיתיים' },
  tip3: { en: 'Ask questions when curious', ar: 'اطرح الأسئلة عندما تكون فضولياً', he: 'שאל שאלות כשאתה סקרן' },
  continueTest: { en: 'Continue Test', ar: 'متابعة الاختبار', he: 'המשך מבחן' },
clearSelection: { en: 'Clear', ar: 'مسح', he: 'נקה' },
  notSure: { en: 'Not Sure?', ar: 'لست متأكد؟', he: 'לא בטוח?' },
  
  // Timer and difficulty
  timeSpent: { en: 'Time', ar: 'الوقت', he: 'זמן' },
  
  // Option tags (you can add more based on your interest_tags)
  analytical: { en: 'Analytical', ar: 'تحليلي', he: 'אנליטי' },
  creative: { en: 'Creative', ar: 'إبداعي', he: 'יצירתי' },
  technical: { en: 'Technical', ar: 'تقني', he: 'טכני' },
  practical: { en: 'Practical', ar: 'عملي', he: 'מעשי' },
  error: { en: 'Error', ar: 'خطأ', he: 'שגיאה' },
  ok: { en: 'OK', ar: 'موافق', he: 'אישור' },
  questions: { en: 'questions', ar: 'أسئلة', he: 'שאלות' },
  approxTime: { en: '10-15 minutes', ar: '10-15 دقيقة', he: '10-15 דקות' },
  loadingNextQuestion: { en: 'Loading next question...', ar: 'جاري تحميل السؤال التالي...', he: 'טוען שאלה הבאה...' },
  questionsCompleted: { en: 'questions completed', ar: 'أسئلة مكتملة', he: 'שאלות הושלמו' },
  detailedReport: { en: 'Detailed Report', ar: 'تقرير مفصل', he: 'דוח מפורט' },
  detailedReportMessage: { en: 'Full detailed report with comprehensive analysis will be available in the full version.', ar: 'التقرير المفصل الكامل مع التحليل الشامل سيكون متاحاً في النسخة الكاملة.', he: 'דוח מפורט מלא עם ניתוח מקיף יהיה זמין בגרסה המלאה.' },
  
  // Feature descriptions
  discoverStrengthsDesc: { en: 'Identify your natural talents and abilities', ar: 'حدد مواهبك وقدراتك الطبيعية', he: 'זהה את הכישרונות והיכולות הטבעיים שלך' },
  findPassionsDesc: { en: 'Discover what truly motivates and interests you', ar: 'اكتشف ما يلهمك ويهتم بك حقاً', he: 'גלה מה באמת מעורר ומעניין אותך' },
  careerGuidanceDesc: { en: 'Get personalized career path recommendations', ar: 'احصل على توصيات مسار مهني مخصصة', he: 'קבל המלצות מסלול קריירה אישיות' },
  
  // Additional feedback messages
  thoughtfulCorrect: { en: 'Well thought out! Correct answer!', ar: 'مدروسة جيداً! إجابة صحيحة!', he: 'מחושב היטב! תשובה נכונה!' },
};
// Add to your translations in utils/languages.js
const testTranslations = {
  smartTest: { en: 'Smart Career Test', ar: 'اختبار المسار الذكي', he: 'מבחן קריירה חכם' },
  testDescription: { en: 'Discover your strengths and interests', ar: 'اكتشف نقاط قوتك واهتماماتك', he: 'גלה את החוזקות והתחומי העניין שלך' },
  discoverStrengths: { en: 'Discover your hidden talents', ar: 'اكتشف مواهبك الخفية', he: 'גלה את הכישרונות החבויים שלך' },
  findPassions: { en: 'Find what truly excites you', ar: 'اكتشف ما يثير حماسك حقاً', he: 'מצא מה באמת מלהיב אותך' },
  careerGuidance: { en: 'Get personalized career guidance', ar: 'احصل على توجيه مهني مخصص', he: 'קבל הכוונה קריירה אישית' },
  startJourney: { en: 'Start My Journey', ar: 'ابدأ رحلتي', he: 'התחל את המסע שלי' },
  question: { en: 'Question', ar: 'سؤال', he: 'שאלה' },
  nextQuestion: { en: 'Next Question', ar: 'السؤال التالي', he: 'שאלה הבאה' },
  loadingQuestion: { en: 'Loading next question...', ar: 'جاري تحميل السؤال التالي...', he: 'טוען שאלה הבאה...' },
  preparingTest: { en: 'Preparing your test...', ar: 'جاري تحضير الاختبار...', he: 'מכין את המבחן שלך...' },
};

// Don't forget to add testTranslations to your main translations object

// Add to your existing translations
export const translations = {
  ...authTranslations,
  ...formTranslations, 
  ...errorTranslations,
  ...userTypeTranslations,
  ...TestTranslations,
  ...testTranslations,// Add the new test translations
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