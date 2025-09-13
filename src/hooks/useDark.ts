import { useUserPreference } from '@/store';
import { useCallback, useEffect, useMemo } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { darkTheme, lightTheme } from '@/theme';
import { ThemeMode } from '@/constant';

const useDark = () => {
    const themeMode = useUserPreference(state => state.themeMode);
    const setThemeMode = useUserPreference(state => state.setThemeMode);
    // 使用 useMediaQuery 钩子实时跟踪系统主题变化
    const isSystemDark = useMediaQuery('(prefers-color-scheme: dark)');
    const isDark = useMemo(() => (themeMode === ThemeMode.SYSTEM ? isSystemDark : themeMode === ThemeMode.DARK), [isSystemDark, themeMode]);
    // 响应式 theme
    const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

    // 切换主题，支持传入目标主题
    const toggleTheme = useCallback(
        (target?: ThemeMode) => {
            if (target) {
                setThemeMode(target);
                return;
            }
            setThemeMode(
                themeMode === ThemeMode.SYSTEM
                    ? isSystemDark
                        ? ThemeMode.LIGHT
                        : ThemeMode.DARK
                    : themeMode === ThemeMode.DARK
                      ? ThemeMode.LIGHT
                      : ThemeMode.DARK
            );
        },
        [isSystemDark, setThemeMode, themeMode]
    );

    // 切换主题 (动画), 支持传入目标主题
    const toggleThemeWithAnimation = useCallback(
        async (e: React.MouseEvent, target?: ThemeMode) => {
            // 若传入目标主题 判断目标主题是否为黑暗模式
            const nextIsDark = target ? (target === ThemeMode.DARK ? true : target === ThemeMode.LIGHT ? false : isSystemDark ? true : false) : !isDark;
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
        document.documentElement.classList.toggle(ThemeMode.DARK, isDark);
    }, [isDark]);

    return { isDark, theme, toggleTheme, toggleThemeWithAnimation };
};

export default useDark;
