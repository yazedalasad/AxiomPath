// قائمة المدارس العربية في جنوب إسرائيل
export const israeliSchools = [
  // بئر السبع (Be'er Sheva)
  { id: 1, name: 'مدرسة الأمل الثانوية - بئر السبع', city: 'بئر السبع', type: 'ثانوية' },
  { id: 2, name: 'مدرسة النور الثانوية - بئر السبع', city: 'بئر السبع', type: 'ثانوية' },
  { id: 3, name: 'المدرسة الشاملة - بئر السبع', city: 'بئر السبع', type: 'شاملة' },
  
  // الرهط (Rahat)
  { id: 4, name: 'مدرسة الرهط الثانوية للبنين', city: 'الرهط', type: 'ثانوية' },
  { id: 5, name: 'مدرسة الرهط الثانوية للبنات', city: 'الرهط', type: 'ثانوية' },
  { id: 6, name: 'مدرسة الأمل الشاملة - الرهط', city: 'الرهط', type: 'شاملة' },
  { id: 7, name: 'مدرسة الفارابي - الرهط', city: 'الرهط', type: 'ثانوية' },
  
  // كسيفة (Kuseife)
  { id: 8, name: 'مدرسة كسيفة الثانوية', city: 'كسيفة', type: 'ثانوية' },
  { id: 9, name: 'المدرسة الشاملة - كسيفة', city: 'كسيفة', type: 'شاملة' },
  
  // حورة (Hura)
  { id: 10, name: 'مدرسة حورة الثانوية', city: 'حورة', type: 'ثانوية' },
  { id: 11, name: 'مدرسة النهضة - حورة', city: 'حورة', type: 'شاملة' },
  
  // تل السبع (Tel Sheva)
  { id: 12, name: 'مدرسة تل السبع الثانوية', city: 'تل السبع', type: 'ثانوية' },
  { id: 13, name: 'المدرسة الشاملة - تل السبع', city: 'تل السبع', type: 'شاملة' },
  
  // عرعرة النقب (Ar'arat an-Naqab)
  { id: 14, name: 'مدرسة عرعرة النقب الثانوية', city: 'عرعرة النقب', type: 'ثانوية' },
  { id: 15, name: 'مدرسة الأفق - عرعرة النقب', city: 'عرعرة النقب', type: 'شاملة' },
  
  // لقية (Lakiya)
  { id: 16, name: 'مدرسة لقية الثانوية', city: 'لقية', type: 'ثانوية' },
  { id: 17, name: 'المدرسة الشاملة - لقية', city: 'لقية', type: 'شاملة' },
  
  // شقيب السلام (Segev Shalom)
  { id: 18, name: 'مدرسة شقيب السلام الثانوية', city: 'شقيب السلام', type: 'ثانوية' },
  { id: 19, name: 'مدرسة المستقبل - شقيب السلام', city: 'شقيب السلام', type: 'شاملة' },
  
  // القصوم (Al-Qassum)
  { id: 20, name: 'مدرسة القصوم الثانوية', city: 'القصوم', type: 'ثانوية' },
  
  // أبو قرينات (Abu Qurainat)
  { id: 21, name: 'مدرسة أبو قرينات الثانوية', city: 'أبو قرينات', type: 'ثانوية' },
  
  // مولدة (Mulada)
  { id: 22, name: 'مدرسة مولدة الثانوية', city: 'مولدة', type: 'ثانوية' },
  { id: 23, name: 'المدرسة الشاملة - مولدة', city: 'مولدة', type: 'شاملة' },
  
  // أم بطين (Umm Batin)
  { id: 24, name: 'مدرسة أم بطين الثانوية', city: 'أم بطين', type: 'ثانوية' },
  
  // بير هداج (Bir Hadaj)
  { id: 25, name: 'مدرسة بير هداج الثانوية', city: 'بير هداج', type: 'ثانوية' },
  
  // ديمونا (Dimona)
  { id: 26, name: 'المدرسة الثانوية العربية - ديمونا', city: 'ديمونا', type: 'ثانوية' },
  
  // عرعرة (Ar'ara)
  { id: 27, name: 'مدرسة عرعرة الثانوية', city: 'عرعرة', type: 'ثانوية' },
  
  // أبو تلول (Abu Tulul)
  { id: 28, name: 'مدرسة أبو تلول الثانوية', city: 'أبو تلول', type: 'ثانوية' },
  
  // كحلة (Kahaleh)
  { id: 29, name: 'مدرسة كحلة الثانوية', city: 'كحلة', type: 'ثانوية' },
  
  // وادي النعم (Wadi al-Na'am)
  { id: 30, name: 'مدرسة وادي النعم الثانوية', city: 'وادي النعم', type: 'ثانوية' },
];

// دالة للبحث عن المدارس
export const searchSchools = (query) => {
  if (!query) return israeliSchools;
  
  const lowerQuery = query.toLowerCase();
  return israeliSchools.filter(school => 
    school.name.toLowerCase().includes(lowerQuery) ||
    school.city.toLowerCase().includes(lowerQuery)
  );
};

// دالة للحصول على المدن
export const getCities = () => {
  const cities = [...new Set(israeliSchools.map(school => school.city))];
  return cities.sort();
};

// دالة للحصول على المدارس حسب المدينة
export const getSchoolsByCity = (city) => {
  return israeliSchools.filter(school => school.city === city);
};
