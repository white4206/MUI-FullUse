import { useUserPreference } from '@/store';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { darkTheme, lightTheme } from '@/theme';
import screenfull from 'screenfull';

const useDark = () => {
    const themeMode = useUserPreference(state => state.themeMode);
    const setThemeMode = useUserPreference(state => state.setThemeMode);

    // 跟随 themeMode 和系统主题
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = themeMode === 'auto' ? isSystemDark : themeMode === 'dark';

    // 响应式 theme
    const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

    // 监听系统主题变化（仅当 themeMode 为 auto 时）
    useEffect(() => {
        if (themeMode !== 'auto') return;
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = () => setThemeMode('auto'); // 触发 zustand 状态更新
        media.addEventListener('change', handler);
        return () => media.removeEventListener('change', handler);
    }, [themeMode, setThemeMode]);

    // 切换主题，支持传入目标主题
    const toggleTheme = (target?: 'light' | 'dark' | 'auto') => {
        if (target) {
            setThemeMode(target);
            return;
        }
        if (themeMode === 'auto') setThemeMode(isSystemDark ? 'light' : 'dark');
        else if (themeMode === 'dark') setThemeMode('light');
        else setThemeMode('dark');
    };

    // 切换主题 (动画)，支持传入目标主题
    const toggleThemeWithAnimation = async (e: React.MouseEvent, target?: 'light' | 'dark' | 'auto') => {
        // 若传入目标主题 判断目标主题是否为黑暗模式
        const nextIsDark = target ? (target === 'dark' ? true : target === 'light' ? false : isSystemDark ? true : false) : !isDark;
        // 若传入目标主题不为空且无变化则直接返回跳出
        if (target && nextIsDark === isDark) {
            setThemeMode(target);
            return;
        }

        if (!document.startViewTransition) {
            toggleTheme(target);
        } else {
            const transition = document.startViewTransition(() => {
                toggleTheme(target);
            });
            await transition.ready;
            const { clientX, clientY } = e;
            const radius = Math.hypot(Math.max(clientX, innerWidth - clientX), Math.max(clientY, innerHeight - clientY));
            const clipPath = [`circle(0% at ${clientX}px ${clientY}px)`, `circle(${radius}px at ${clientX}px ${clientY}px)`];
            document.documentElement.animate(
                {
                    clipPath: nextIsDark ? clipPath.reverse() : clipPath,
                },
                {
                    duration: 500,
                    pseudoElement: nextIsDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
                }
            );
        }
    };

    // 切换 html 类
    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
    }, [isDark]);

    return { isDark, theme, toggleTheme, toggleThemeWithAnimation };
};

const useFullScreen = (target = document.documentElement) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
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

const useBreakpoint = () => {
    /**
     * xs, extra-small: 0px
     * sm, small: 600px
     * md, medium: 900px
     * lg, large: 1200px
     * xl, extra-large: 1536px
     */
    const xs = useMediaQuery(theme => theme.breakpoints.up('xs'));
    const sm = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme => theme.breakpoints.between('sm', 'md'));
    const lg = useMediaQuery(theme => theme.breakpoints.between('md', 'lg'));
    const xl = useMediaQuery(theme => theme.breakpoints.up('xl'));
    return { xs, sm, md, lg, xl };
};
export { useDark, useFullScreen, useBreakpoint };
