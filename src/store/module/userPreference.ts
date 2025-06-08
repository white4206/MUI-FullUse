import { create } from 'zustand';

interface UserPreferenceState {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    font: string;
    navBarButtons: Record<string, 'navBar' | 'settings'>;
    setTheme: (theme: 'light' | 'dark' | 'auto') => void;
    setLanguage: (language: string) => void;
    setFont: (font: string) => void;
    setNavBarButton: (key: string, value: 'navBar' | 'settings') => void;
    loadFromStorage: () => void;
}

export const useUserPreference = create<UserPreferenceState>(set => ({
    theme: (localStorage.getItem('theme') as 'light' | 'dark' | 'auto') || 'auto',
    language: localStorage.getItem('i18n') || 'auto',
    font: localStorage.getItem('font') || 'system-ui',
    navBarButtons: JSON.parse(localStorage.getItem('navBarButtons') || '{"theme":"navBar","i18n":"navBar","font":"settings"}') as Record<
        string,
        'navBar' | 'settings'
    >,
    setTheme: theme => {
        localStorage.setItem('theme', theme);
        set({ theme });
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
    loadFromStorage: () => {
        set({
            theme: (localStorage.getItem('theme') as 'light' | 'dark' | 'auto') || 'auto',
            language: localStorage.getItem('i18n') || 'auto',
            font: localStorage.getItem('font') || 'system-ui',
            navBarButtons: JSON.parse(localStorage.getItem('navBarButtons') || '{"theme":"navBar","i18n":"navBar","font":"settings"}') as Record<
                string,
                'navBar' | 'settings'
            >,
        });
    },
}));
