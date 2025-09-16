import { ThemeMode } from '@/constant';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPreferenceState {
    themeMode: ThemeMode;
    language: string;
    font: string;
    navBarButtons: Record<string, 'navBar' | 'setting'>;
    setThemeMode: (themeMode: ThemeMode) => void;
    setLanguage: (language: string) => void;
    setFont: (font: string) => void;
    setNavBarButton: (key: string, value: 'navBar' | 'setting') => void;
    toggleShowNavBarButton: (key: string) => void;
}

const defaultNavBarButton = {
    theme: 'navBar',
    i18n: 'navBar',
    font: 'setting',
    fullscreen: 'navBar',
};

export const useUserPreference = create<UserPreferenceState>()(
    persist(
        (set, get) => ({
            themeMode: ThemeMode.SYSTEM,
            language: 'auto',
            font: "'Roboto','Helvetica','Arial',sans-serif",
            navBarButtons: { ...defaultNavBarButton } as Record<string, 'navBar' | 'setting'>,
            setThemeMode: themeMode => set({ themeMode }),
            setLanguage: language => set({ language }),
            setFont: font => set({ font }),
            setNavBarButton: (key, value) =>
                set(state => ({
                    navBarButtons: { ...state.navBarButtons, [key]: value },
                })),
            toggleShowNavBarButton: key =>
                set(state => ({
                    navBarButtons: {
                        ...state.navBarButtons,
                        [key]: state.navBarButtons[key] === 'navBar' ? 'setting' : 'navBar',
                    },
                })),
        }),
        {
            name: 'user-preference', // localStorage key
            // 可以自定义存储方式，如 storage: createJSONStorage(() => sessionStorage)
        }
    )
);
