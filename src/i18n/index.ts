import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { useUserPreference } from '@/store';
import config, { languages } from '@/config';

const language: string = useUserPreference.getState().getLanguage();

const loadResources = async () => {
    const result: Record<string, any> = {};
    for (const language of languages) {
        const module = await import(`/src/i18n/${language.code}`);
        result[language.code] = module.default;
    }
    return result;
};

void i18n.use(initReactI18next).init({
    resources: await loadResources(),
    lng: language, // 默认语言
    fallbackLng: config.fallbackLanguage, // 回退默认语言
    interpolation: { escapeValue: false },
});

const useI18n = () => {
    const setLanguage = useUserPreference(state => state.setLanguage);

    const changeLanguage = (language: string) => {
        void i18n.changeLanguage(language);
        setLanguage(language);
    };

    return { changeLanguage };
};

export default useI18n;
