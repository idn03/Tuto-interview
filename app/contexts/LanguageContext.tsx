import React, { createContext, useState, useContext, ReactNode } from 'react';
import en from '@dictionaries/en.json';
import vi from '@dictionaries/vi.json';

type Language = 'en' | 'vi';
type Dictionary = typeof en;

interface LanguageContextProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    dictionary: Dictionary;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('en');
    const dictionary = language === 'en' ? en : vi;

    return (
        <LanguageContext.Provider value={{ language, setLanguage, dictionary }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within LanguageProvider');
    return context;
};