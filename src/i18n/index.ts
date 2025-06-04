import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import ch from './ch';

void i18n.use(initReactI18next).init({
    resources: {
        en,
        ch,
    },
    lng: 'ch', // 默认语言
    fallbackLng: 'ch',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
