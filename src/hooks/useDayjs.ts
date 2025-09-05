import { languages } from '@/config';
import { useUserPreference } from '@/store';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { useCallback, useEffect } from 'react';

// 按配置导入dayjs国际化文件
const initDayjs = async () => {
    for (const language of languages) {
        await language.locale.dayjs();
    }
};

await initDayjs();

const useDayjs = () => {
    const { getLanguage } = useUserPreference();

    const dateFormat = useCallback(
        (value: number | string, fmt: string = 'MMMM') => {
            return dayjs(value).locale(getLanguage()).format(fmt);
        },
        [getLanguage]
    );

    useEffect(() => {
        dayjs.extend(localizedFormat);
    }, [getLanguage]);

    return { dayjs, dateFormat };
};

export default useDayjs;
