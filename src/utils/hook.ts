import { useUserPreference } from '@/store';
import { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

const useDark = () => {
    const theme = useUserPreference(state => state.theme);
    const setTheme = useUserPreference(state => state.setTheme);
    // 读取用户首选项或系统主题
    const [isDark, setIsDark] = useState(theme === 'auto' ? window.matchMedia('(prefers-color-scheme: dark)').matches : theme === 'dark');

    // 监听系统主题变化（仅当用户未手动设置时）
    useEffect(() => {
        const media = window.matchMedia('(prefers-color-scheme: dark)');

        const handler = (e: MediaQueryListEvent) => {
            if (!theme || theme === 'auto') {
                setIsDark(e.matches);
            }
        };
        media.addEventListener('change', handler);
        return () => media.removeEventListener('change', handler);
    }, [theme]);

    // 监听黑暗模式
    useEffect(() => {
        // 黑暗模式下给html添加一个dark类
        if (isDark) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [isDark]);

    // 用户切换时持久化
    const toggleTheme = () => {
        setIsDark(!isDark);
        // 若切换主题为系统当前主题则跟随系统变化
        if (!isDark === window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('auto');
        else setTheme(!isDark ? 'dark' : 'light');
    };
    return { isDark, toggleTheme };
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
export { useDark, useBreakpoint };
