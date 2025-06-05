import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import ch from './ch';

const language =
    localStorage.getItem('i18n') === 'auto'
        ? navigator.language || navigator.languages[0] // 若i18n为auto则使用浏览器当前语言
        : localStorage.getItem('i18n') || navigator.language || navigator.languages[0];

void i18n.use(initReactI18next).init({
    resources: {
        en,
        ch,
    },
    lng: language || 'ch', // 默认语言
    fallbackLng: 'ch', // 回退默认语言
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
