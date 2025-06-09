import { create } from 'zustand';

interface UserPreferenceState {
    themeMode: 'light' | 'dark' | 'auto';
    language: string;
    font: string;
    navBarButtons: Record<string, 'navBar' | 'settings'>;
    setThemeMode: (themeMode: 'light' | 'dark' | 'auto') => void;
    setLanguage: (language: string) => void;
    setFont: (font: string) => void;
    setNavBarButton: (key: string, value: 'navBar' | 'settings') => void;
    toggleShowNavBarButton: (key: string) => void;
    loadFromStorage: () => void;
}

export const useUserPreference = create<UserPreferenceState>(set => ({
    themeMode: (localStorage.getItem('themeMode') as 'light' | 'dark' | 'auto') || 'auto',
    language: localStorage.getItem('i18n') || 'auto',
    font: localStorage.getItem('font') || 'system-ui',
    navBarButtons: JSON.parse(localStorage.getItem('navBarButtons') || '{"theme":"navBar","i18n":"navBar","font":"settings"}') as Record<
        string,
        'navBar' | 'settings'
    >,
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
            const navBarButtons = { ...state.navBarButtons, [key]: state.navBarButtons[key] === 'navBar' ? 'settings' : 'navBar' } as Record<
                string,
                'navBar' | 'settings'
            >;
            localStorage.setItem('navBarButtons', JSON.stringify(navBarButtons));
            return { navBarButtons };
        });
    },
    loadFromStorage: () => {
        set({
            themeMode: (localStorage.getItem('themeMode') as 'light' | 'dark' | 'auto') || 'auto',
            language: localStorage.getItem('i18n') || 'auto',
            font: localStorage.getItem('font') || 'system-ui',
            navBarButtons: JSON.parse(localStorage.getItem('navBarButtons') || '{"theme":"navBar","i18n":"navBar","font":"settings"}') as Record<
                string,
                'navBar' | 'settings'
            >,
        });
    },
}));
