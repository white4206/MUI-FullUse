import zh_CN from '@/i18n/zh-CN';
import en from '@/i18n/en';

const languages = [
    { id: 1, code: 'zh-CN', label: '简体中文', language: zh_CN },
    { id: 2, code: 'en', label: 'English', language: en },
];
const fonts = [
    { id: 1, font: "'Roboto','Helvetica','Arial',sans-serif", name: 'Roboto', face: {}, default: true },
    {
        id: 2,
        font: "'阿里妈妈方圆体 VF Regular', 'Roboto','Helvetica','Arial',sans-serif",
        name: '阿里妈妈方圆体',
        face: {
            'font-family': '阿里妈妈方圆体 VF Regular',
            src: [
                { url: '/fonts/AlimamaFangYuanTiVF-Thin.woff2', format: 'woff2' },
                { url: '/fonts/AlimamaFangYuanTiVF-Thin.woff', format: 'woff' },
                { url: '/fonts/AlimamaFangYuanTiVF-Thin.ttf', format: 'ttf' },
            ],
            'font-display': 'swap',
        },
        default: false,
    },
    { id: 3, font: 'system-ui', name: 'system-ui', face: {}, default: false },
];
const config = {
    name: 'MUI-FullUse',
    defaultLanguage: 'zh-CN',
    fallbackLng: 'zh-CN',
    defaultFont: '',
    languages,
    fonts,
};

export { fonts, languages };
export default config;
