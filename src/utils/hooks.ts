import { useUserPreference } from '@/store';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { darkTheme, lightTheme } from '@/theme';
import screenfull from 'screenfull';

type ThemeMode = 'light' | 'dark' | 'auto';

const useDark = () => {
    const themeMode = useUserPreference(state => state.themeMode);
    const setThemeMode = useUserPreference(state => state.setThemeMode);
    // 使用 useMediaQuery 钩子实时跟踪系统主题变化
    const isSystemDark = useMediaQuery('(prefers-color-scheme: dark)');
    const isDark = useMemo(() => (themeMode === 'auto' ? isSystemDark : themeMode === 'dark'), [isSystemDark, themeMode]);
    // 响应式 theme
    const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

    // 切换主题，支持传入目标主题
    const toggleTheme = useCallback(
        (target?: ThemeMode) => {
            if (target) {
                setThemeMode(target);
                return;
            }
            setThemeMode(themeMode === 'auto' ? (isSystemDark ? 'light' : 'dark') : themeMode === 'dark' ? 'light' : 'dark');
        },
        [isSystemDark, setThemeMode, themeMode]
    );

    // 切换主题 (动画), 支持传入目标主题
    const toggleThemeWithAnimation = useCallback(
        async (e: React.MouseEvent, target?: ThemeMode) => {
            // 若传入目标主题 判断目标主题是否为黑暗模式
            const nextIsDark = target ? (target === 'dark' ? true : target === 'light' ? false : isSystemDark ? true : false) : !isDark;
            // 若传入目标主题无变化则直接返回跳出
            if (nextIsDark === isDark) {
                toggleTheme(target);
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
        },
        [isDark, isSystemDark, toggleTheme]
    );

    // 切换主题时添加对应的 html 类
    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
    }, [isDark]);

    return { isDark, theme, toggleTheme, toggleThemeWithAnimation };
};

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
export { useDark, useFullScreen, useBreakpoint };
