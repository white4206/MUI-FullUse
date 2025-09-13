import { useUserPreference } from '@/store';
import { fonts } from '@/config';
import { useState } from 'react';

const useFont = () => {
    const setFont = useUserPreference(state => state.setFont);
    const [initalFontFace, setInitalFontFace] = useState<string>('');

    const initFont = () => {
        const defaultFontFace: Record<string, any> = fonts.find(item => item.default)?.face ?? {};
        for (const key in defaultFontFace) {
            if (key === 'src') {
                const srcValue = defaultFontFace[key]?.map(src => `url('${src.url}') format('${src.format}')`).join(', ');
            } else setInitalFontFace(initalFontFace => initalFontFace + `${key} : ${defaultFontFace[key]};`);
        }
        // 创建新的样式表
        const sheet = new CSSStyleSheet();
        // 插入@font-face规则
        sheet.insertRule(initalFontFace);
        // 将样式表添加到文档中
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
    };

    const changeFont = (font: string) => {
        document.documentElement.style.setProperty('--full-use-user-font-family', font);
        // TODO 动态添加 @font-face
        setFont(font);
    };

    return { initFont, changeFont };
};

export default useFont;
