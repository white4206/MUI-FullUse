import { create } from 'zustand';

interface UserPreferenceState {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    font: string;
    setTheme: (theme: 'light' | 'dark' | 'auto') => void;
    setLanguage: (language: string) => void;
    setFont: (font: string) => void;
    loadFromStorage: () => void;
}

export const useUserPreference = create<UserPreferenceState>(set => ({
    theme: (localStorage.getItem('theme') as 'light' | 'dark' | 'auto') || 'auto',
    language: localStorage.getItem('i18n') || 'auto',
    font: localStorage.getItem('font') || 'system-ui',
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
    loadFromStorage: () => {
        set({
            theme: (localStorage.getItem('theme') as 'light' | 'dark' | 'auto') || 'auto',
            language: localStorage.getItem('i18n') || 'auto',
            font: localStorage.getItem('font') || 'system-ui',
        });
    },
}));
