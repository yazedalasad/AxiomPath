import React, { createContext, useState, useContext } from 'react';
import { languages } from '../utils/languages';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const switchLanguage = (languageCode) => {
    if (languages[languageCode]) {
      setCurrentLanguage(languageCode);
    }
  };

  const value = {
    currentLanguage,
    switchLanguage,
    textDirection: languages[currentLanguage].dir,
    languages
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};