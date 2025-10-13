import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Language } from '../hooks/useLanguage';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    {
      code: 'en' as Language,
      name: 'English',
      flag: 'https://flagcdn.com/w40/us.png',
      flagLarge: 'https://flagcdn.com/w80/us.png'
    },
    {
      code: 'fr' as Language,
      name: 'Français',
      flag: 'https://flagcdn.com/w40/fr.png',
      flagLarge: 'https://flagcdn.com/w80/fr.png'
    },
    {
      code: 'ar' as Language,
      name: 'العربية',
      flag: 'https://flagcdn.com/w40/tn.png',
      flagLarge: 'https://flagcdn.com/w80/tn.png'
    }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (language: Language) => {
    onLanguageChange(language);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-sky-300 hover:bg-sky-50 transition-all duration-200 bg-white min-w-[100px]"
        aria-label="Select language"
      >
        <img 
          src={currentLang?.flag} 
          alt={`${currentLang?.name} flag`}
          className="w-6 h-4 object-cover rounded-sm border border-gray-200"
          loading="lazy"
        />
        <span className="text-sm font-medium text-gray-700 hidden sm:inline">
          {currentLang?.code.toUpperCase()}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-sky-50 transition-colors duration-200 ${
                  currentLanguage === language.code ? 'bg-sky-50 text-sky-600' : 'text-gray-700'
                }`}
              >
                <img 
                  src={language.flagLarge} 
                  alt={`${language.name} flag`}
                  className="w-8 h-6 object-cover rounded-sm border border-gray-200"
                  loading="lazy"
                />
                <div className="flex-1">
                  <div className="font-medium">{language.name}</div>
                  <div className="text-xs text-gray-500">{language.code.toUpperCase()}</div>
                </div>
                {currentLanguage === language.code && (
                  <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;