// src/i18n/index.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { messages, defaultLocale, AvailableLocales } from './locales';

interface LanguageContextProps {
    locale: AvailableLocales;
    switchLanguage: (newLocale: AvailableLocales) => void;
}

const defaultContextValue: LanguageContextProps = {
    locale: defaultLocale,
    switchLanguage: () => {},
};

const LanguageContext = createContext<LanguageContextProps>(defaultContextValue);

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [locale, setLocale] = useState<AvailableLocales>(defaultLocale);

    const switchLanguage = (newLocale: AvailableLocales) => {
        setLocale(newLocale);
    };

    return (
        <LanguageContext.Provider value={{ locale, switchLanguage }}>
            <IntlProvider locale={locale} messages={messages[locale as AvailableLocales]}>
                {children}
            </IntlProvider>
        </LanguageContext.Provider>
    );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);