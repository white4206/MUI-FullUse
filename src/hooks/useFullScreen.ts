import { useCallback, useEffect, useRef, useState } from 'react';
import screenfull from 'screenfull';
import { debounce } from 'lodash';
import 'numeral/locales';
import numeral from 'numeral';

const useFullScreen = (target = document.documentElement) => {
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const targetRef = useRef<HTMLElement | null>(target);

    // 进入全屏
    const enterFullscreen = useCallback(() => {
        if (screenfull.isEnabled && targetRef.current) {
            void screenfull.request(targetRef.current);
        }
    }, []);

    // 退出全屏
    const exitFullscreen = useCallback(() => {
        if (screenfull.isEnabled) {
            void screenfull.exit();
        }
    }, []);

    // 切换全屏
    const toggleFullscreen = useCallback(() => {
        if (screenfull.isEnabled) {
            if (screenfull.isFullscreen) {
                void screenfull.exit();
            } else if (targetRef.current) {
                void screenfull.request(targetRef.current);
            }
        }
    }, []);

    // 监听全屏状态变化
    useEffect(() => {
        if (!screenfull.isEnabled) return;
        const handler = () => setIsFullscreen(screenfull.isFullscreen);
        screenfull.on('change', handler);
        return () => {
            screenfull.off('change', handler);
        };
    }, []);

    return {
        isFullscreen,
        enterFullscreen,
        exitFullscreen,
        toggleFullscreen,
    };
};

export default useFullScreen;
const useBreakpoint = () => {
    /**
     * xs, extra-small: 0px
     * sm, small: 600px
     * md, medium: 900px
     * lg, large: 1200px
     * xl, extra-large: 1536px
     */
    const xs = useMediaQuery(theme => theme.breakpoints.between('xs', 'sm'));
    const sm = useMediaQuery(theme => theme.breakpoints.between('sm', 'md'));
    const md = useMediaQuery(theme => theme.breakpoints.between('md', 'lg'));
    const lg = useMediaQuery(theme => theme.breakpoints.between('lg', 'xl'));
    const xl = useMediaQuery(theme => theme.breakpoints.up('xl'));
    return { xs, sm, md, lg, xl };
};

const useDebounce = <T extends (...args: any[]) => any>(callback: T, delay: number) => {
    const debouncedCallback = useCallback(debounce(callback, delay), [callback, delay]);

    return debouncedCallback;
};

const useNumeral = () => {
    const { language } = useUserPreference();
    numeral.zeroFormat('N/A');
    numeral.defaultFormat('0,0.0a');

    useEffect(() => {
        // languages.forEach(language => {
        //     if (language.language === 'en') return;
        //     numeral.register('locale', language.language, {
        //         delimiters: {
        //             thousands: ' ',
        //             decimal: ',',
        //         },
        //         abbreviations: {
        //             thousand: 'k',
        //             million: 'm',
        //             billion: 'b',
        //             trillion: 't',
        //         },
        //         ordinal: function (number) {
        //             return number === 1 ? 'er' : 'ème';
        //         },
        //         currency: {
        //             symbol: '€',
        //         },
        //     });
        // });
    }, []);

    useEffect(() => {
        const languageLocaleMap: Record<string, string> = {
            'zh-CN': 'chs',
            en: 'en',
        };
        const currentLanguage = language === 'auto' ? navigator.language || navigator.languages[0] : language;
        const currentLocale = languageLocaleMap[currentLanguage] || 'en';
        numeral.locale(currentLocale);
    }, [language]);

    return numeral;
};

export { useDark, useFullScreen, useBreakpoint, useDebounce, useNumeral };
