import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/i18n/en';
import ch from '@/i18n/ch';
import chSvg from '@/assets/svg/ch.svg';
import enSvg from '@/assets/svg/en.svg';
import { useUserPreference } from '@/store';

const language =
    localStorage.getItem('i18n') === 'auto'
        ? navigator.language || navigator.languages[0] // 若i18n为auto则使用浏览器当前语言
        : localStorage.getItem('i18n') || navigator.language || navigator.languages[0];

void i18n.use(initReactI18next).init({
    resources: {
        ch,
        en,
    },
    lng: language || 'ch', // 默认语言
    fallbackLng: 'ch', // 回退默认语言
    interpolation: {
        escapeValue: false,
    },
});

const useI18n = () => {
    const languages = [
        { id: 1, language: 'ch', label: '简体中文', icon: chSvg },
        { id: 2, language: 'en', label: 'English', icon: enSvg },
    ];
    const setLanguage = useUserPreference(state => state.setLanguage);

    const changeLanguage = (language: string) => {
        void i18n.changeLanguage(language);
        // 若切换语言为浏览器当前语言则跟随浏览器变化
        if ((navigator.language || navigator.languages[0]) === language) setLanguage('auto');
        else setLanguage(language);
    };

    return { languages, changeLanguage };
};
export default useI18n;
