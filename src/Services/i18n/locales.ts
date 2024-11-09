import en from './messages/en.json';
import bn from './messages/bn.json';

export type AvailableLocales = 'en' | 'bn';

export const messages: Record<AvailableLocales, Record<string, string>> = {
    en,
    bn,
};

export const defaultLocale: AvailableLocales = 'en';
export const supportedLocales: AvailableLocales[] = ['en', 'bn'];