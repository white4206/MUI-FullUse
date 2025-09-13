import i18n, { type Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { useUserPreference } from '@/store';
import config, { languages } from '@/config';
import { transform } from 'lodash';

const language = useUserPreference.getState().language;
const browserLanguage = navigator.language ?? navigator.languages[0];

void i18n.use(initReactI18next).init({
    resources: transform(
        languages,
        // 根据config中的语言配置动态创建
        (result: Resource, value) => {
            result[value.code] = value.language;
        },
        {}
    ),
    lng: language === 'auto' ? browserLanguage : (language ?? browserLanguage), // 默认语言
    fallbackLng: config.fallbackLng, // 回退默认语言
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
