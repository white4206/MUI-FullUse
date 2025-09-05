import { useCallback, useEffect } from 'react';
import { useUserPreference } from '@/store';
import numeral from 'numeral';
import { languages } from '@/config';

const languageMap = (language: string) => {
    const map: Record<string, string> = {
        'zh-CN': 'chs',
    };
    return map[language] ?? language;
};

// 按配置导入numeral国际化
const initNumeral = async () => {
    for (const language of languages) {
        await language.locale.numeral?.();
    }
};

await initNumeral();

const useNumeral = () => {
    const { getLanguage } = useUserPreference();

    const numberFormat = useCallback(
        (value: number | string, fmt?: string) => {
            numeral.locale(languageMap(getLanguage()));
            return numeral(value).format(fmt);
        },
        [getLanguage]
    );

    // 只需初始化一次的配置
    useEffect(() => {
        numeral.zeroFormat('N/A');
        numeral.defaultFormat('0,0.0a');
    }, []);

    return { numeral, numberFormat };
};

export default useNumeral;
