// دوال التحقق من صحة البيانات

// التحقق من البريد الإلكتروني (Gmail فقط)
export const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, error: 'البريد الإلكتروني مطلوب' };
  }
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'يجب أن يكون البريد الإلكتروني من Gmail (@gmail.com)' };
  }
  
  return { isValid: true, error: null };
};

// التحقق من رقم الهاتف الإسرائيلي
export const validatePhone = (phone) => {
  if (!phone) {
    return { isValid: false, error: 'رقم الهاتف مطلوب' };
  }
  
  // إزالة المسافات والشرطات
  const cleanPhone = phone.replace(/[\s-]/g, '');
  
  // التحقق من صيغة الهاتف الإسرائيلي
  // يمكن أن يبدأ بـ +972 أو 972 أو 0
  const phoneRegex = /^(\+972|972|0)(5[0-9]|[2-4]|[8-9])[0-9]{7}$/;
  
  if (!phoneRegex.test(cleanPhone)) {
    return { isValid: false, error: 'رقم الهاتف غير صحيح. يجب أن يكون رقم هاتف إسرائيلي صحيح' };
  }
  
  return { isValid: true, error: null };
};

// تنسيق رقم الهاتف
export const formatPhone = (phone) => {
  const cleanPhone = phone.replace(/[\s-]/g, '');
  
  // تحويل إلى صيغة +972
  if (cleanPhone.startsWith('0')) {
    return '+972' + cleanPhone.substring(1);
  } else if (cleanPhone.startsWith('972')) {
    return '+' + cleanPhone;
  } else if (cleanPhone.startsWith('+972')) {
    return cleanPhone;
  }
  
  return phone;
};

// التحقق من رقم الهوية
export const validateStudentId = (id) => {
  if (!id) {
    return { isValid: false, error: 'رقم الهوية مطلوب' };
  }
  
  // التحقق من أن الرقم يحتوي على 9 أرقام فقط
  const idRegex = /^[0-9]{9}$/;
  if (!idRegex.test(id)) {
    return { isValid: false, error: 'رقم الهوية يجب أن يتكون من 9 أرقام' };
  }
  
  return { isValid: true, error: null };
};

// التحقق من الاسم
export const validateName = (name, fieldName = 'الاسم') => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: `${fieldName} مطلوب` };
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, error: `${fieldName} يجب أن يحتوي على حرفين على الأقل` };
  }
  
  // التحقق من أن الاسم يحتوي على أحرف عربية أو إنجليزية فقط
  const nameRegex = /^[\u0600-\u06FFa-zA-Z\s]+$/;
  if (!nameRegex.test(name)) {
    return { isValid: false, error: `${fieldName} يجب أن يحتوي على أحرف عربية أو إنجليزية فقط` };
  }
  
  return { isValid: true, error: null };
};

// التحقق من كلمة المرور
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, error: 'كلمة المرور مطلوبة' };
  }
  
  if (password.length < 6) {
    return { isValid: false, error: 'كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل' };
  }
  
  return { isValid: true, error: null };
};

// التحقق من تاريخ الميلاد
export const validateBirthday = (birthday) => {
  if (!birthday) {
    return { isValid: false, error: 'تاريخ الميلاد مطلوب' };
  }
  
  const birthDate = new Date(birthday);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  
  // التحقق من أن العمر بين 14 و 20 سنة (طلاب الصفوف 9-12)
  if (age < 14 || age > 20) {
    return { isValid: false, error: 'يجب أن يكون عمرك بين 14 و 20 سنة' };
  }
  
  return { isValid: true, error: null };
};

// التحقق من الصف الدراسي
export const validateGrade = (grade) => {
  if (!grade) {
    return { isValid: false, error: 'الصف الدراسي مطلوب' };
  }
  
  const gradeNum = parseInt(grade);
  if (gradeNum < 9 || gradeNum > 12) {
    return { isValid: false, error: 'الصف الدراسي يجب أن يكون بين 9 و 12' };
  }
  
  return { isValid: true, error: null };
};

// التحقق من المدرسة
export const validateSchool = (school) => {
  if (!school) {
    return { isValid: false, error: 'المدرسة مطلوبة' };
  }
  
  return { isValid: true, error: null };
};

// التحقق من تطابق كلمة المرور
export const validatePasswordMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return { isValid: false, error: 'كلمات المرور غير متطابقة' };
  }
  
  return { isValid: true, error: null };
};
