import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import XHR from 'i18next-xhr-backend';

// export const locales = {
//     vi: 'Tiếng Việt',
//     en: 'English',
// };

// Lấy ngôn ngữ từ localStorage hoặc mặc định là 'en'
const savedLanguage = localStorage.getItem('language') || 'en';

i18n.use(XHR)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        lng: savedLanguage,
        fallbackLng: 'en',

        interpolation: {
            escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
    });
