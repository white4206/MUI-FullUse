import { useEffect, useState } from 'react';

const useDark = () => {
    // 读取本地存储用户首选项或系统主题
    const getPreferredTheme = () => {
        const stored = localStorage.getItem('theme');
        if (stored === 'light') return false;
        if (stored === 'dark') return true;
        // 跟随系统
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    };
    const [isDark, setIsDark] = useState(getPreferredTheme());

    // 监听系统主题变化（仅当用户未手动设置时）
    useEffect(() => {
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const store = localStorage.getItem('theme');

        const handler = (e: MediaQueryListEvent) => {
            if (!store || store === 'auto') {
                setIsDark(e.matches);
            }
        };
        media.addEventListener('change', handler);
        return () => media.removeEventListener('change', handler);
    }, []);

    // 用户切换时持久化
    const toggleTheme = () => {
        setIsDark(!isDark);
        // 黑暗模式下给html添加一个dark类
        if (!isDark) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        // 若切换主题为系统当前主题则跟随系统变化
        if (!isDark === window.matchMedia('(prefers-color-scheme: dark)').matches) localStorage.setItem('theme', 'auto');
        else localStorage.setItem('theme', !isDark ? 'dark' : 'light');
    };
    return { isDark, toggleTheme };
};
export { useDark };
