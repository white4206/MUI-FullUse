import { create } from 'zustand';

interface UserPreferenceState {
    themeMode: 'light' | 'dark' | 'auto';
    language: string;
    font: string;
    navBarButtons: Record<string, 'navBar' | 'setting'>;
    setThemeMode: (themeMode: 'light' | 'dark' | 'auto') => void;
    setLanguage: (language: string) => void;
    setFont: (font: string) => void;
    setNavBarButton: (key: string, value: 'navBar' | 'setting') => void;
    toggleShowNavBarButton: (key: string) => void;
    loadFromStorage: () => void;
}

const defaultNavBarButton = {
    theme: 'navBar',
    i18n: 'navBar',
    font: 'setting',
    fullscreen: 'navBar',
};

export const useUserPreference = create<UserPreferenceState>(set => ({
    themeMode: (localStorage.getItem('themeMode') as 'light' | 'dark' | 'auto') || 'auto',
    language: localStorage.getItem('i18n') || 'auto',
    font: localStorage.getItem('font') || "'Roboto','Helvetica','Arial',sans-serif",
    navBarButtons: JSON.parse(localStorage.getItem('navBarButtons') || JSON.stringify(defaultNavBarButton)) as Record<string, 'navBar' | 'setting'>,
    setThemeMode: themeMode => {
        localStorage.setItem('themeMode', themeMode);
        set({ themeMode });
    },
    setLanguage: language => {
        localStorage.setItem('i18n', language);
        set({ language });
    },
    setFont: font => {
        localStorage.setItem('font', font);
        set({ font });
    },
    setNavBarButton: (key, value) => {
        set(state => {
            const navBarButtons = { ...state.navBarButtons, [key]: value };
            localStorage.setItem('navBarButtons', JSON.stringify(navBarButtons));
            return { navBarButtons };
        });
    },
    toggleShowNavBarButton: key => {
        set(state => {
            const navBarButtons = { ...state.navBarButtons, [key]: state.navBarButtons[key] === 'navBar' ? 'setting' : 'navBar' } as Record<
                string,
                'navBar' | 'setting'
            >;
            localStorage.setItem('navBarButtons', JSON.stringify(navBarButtons));
            return { navBarButtons };
        });
    },
    loadFromStorage: () => {
        set({
            themeMode: (localStorage.getItem('themeMode') as 'light' | 'dark' | 'auto') || 'auto',
            language: localStorage.getItem('i18n') || 'auto',
            font: localStorage.getItem('font') || "'Roboto','Helvetica','Arial',sans-serif",
            navBarButtons: JSON.parse(localStorage.getItem('navBarButtons') || JSON.stringify(defaultNavBarButton)) as Record<string, 'navBar' | 'setting'>,
        });
    },
}));
