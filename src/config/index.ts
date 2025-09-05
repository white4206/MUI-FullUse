export interface Language {
    id: number;
    code: string;
    label: string;
    locale: {
        numeral?: () => Promise<any>;
        dayjs: () => Promise<any>;
    };
}

const languages: Language[] = [
    { id: 1, code: 'zh-CN', label: '简体中文', locale: { numeral: () => import('numeral/locales/chs'), dayjs: () => import('dayjs/locale/zh') } },
    { id: 2, code: 'en', label: 'English', locale: { dayjs: () => import('dayjs/locale/en') } },
];

export interface Font {
    id: number;
    font: string;
    name: string;
    face?: {
        'font-family': string;
        src: { url: string; format: string }[];
    } & Partial<Record<string, any>>;
    default: boolean;
}

const fonts: Font[] = [
    { id: 1, font: "'Roboto','Helvetica','Arial',sans-serif", name: 'Roboto', default: true },
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
    { id: 3, font: 'system-ui', name: 'system-ui', default: false },
];

const config = {
    name: 'MUI-FullUse',
    tokenKey: 'FullUse-Token',
    defaultLanguage: 'zh-CN',
    fallbackLanguage: 'zh-CN',
    defaultFont: '',
    languages,
    fonts,
};

export { fonts, languages };
export default config;
