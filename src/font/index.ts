import { useUserPreference } from '@/store';
import { fonts } from '@/config';

const useFont = () => {
    const { font, setFont } = useUserPreference();

    const setFontToStyle = (font: string) => document.documentElement.style.setProperty('--full-use-user-font-family', font);

    const initFont = () => {
        fonts.forEach(font => {
            if (!font?.face) return;

            let style = '';
            for (const key in font.face) {
                if (key === 'src') {
                    const srcValue = font.face[key]?.map(src => `url('${src.url}') format('${src.format}')`).join(', ');
                    style += `${key} : ${srcValue}; `;
                } else style += `${key} : ${font.face[key]}; `;
            }

            // 创建新的样式表
            const sheet = new CSSStyleSheet();
            // 插入@font-face规则
            sheet.insertRule(`@font-face  { ${style} }`);
            // 将样式表添加到文档中
            document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
        });
        setFontToStyle(font);
    };

    const changeFont = (font: string) => {
        setFontToStyle(font);
        setFont(font);
    };

    return { initFont, changeFont };
};

export default useFont;
