import { useState, useEffect } from 'react';
import { translations } from '../translations';

export type Language = 'en' | 'fr' | 'ar';

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('plastifind_language') as Language;
    if (savedLanguage && ['en', 'fr', 'ar'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('plastifind_language', language);
    
    // Update document direction for Arabic
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = language;
    }
  };

  const t = translations[currentLanguage];

  return {
    currentLanguage,
    changeLanguage,
    t,
    isRTL: currentLanguage === 'ar'
  };
};