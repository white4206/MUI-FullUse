import { FOLLOW_SYSTEM, ThemeMode } from '@/constant';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum NavBarButton {
    NAV_BAR = 'navBar',
    SETTING = 'setting',
}

export interface UserPreferenceState {
    themeMode: ThemeMode;
    language: string;
    font: string;
    navBarButtons: Record<string, NavBarButton>;
    setThemeMode: (themeMode: ThemeMode) => void;
    setLanguage: (language: string) => void;
    getLanguage: () => string;
    setFont: (font: string) => void;
    setNavBarButton: (key: string, value: NavBarButton) => void;
    toggleShowNavBarButton: (key: string) => void;
}

const defaultNavBarButton = {
    theme: NavBarButton.NAV_BAR,
    i18n: NavBarButton.NAV_BAR,
    font: NavBarButton.SETTING,
    fullscreen: NavBarButton.NAV_BAR,
};

export const useUserPreference = create<UserPreferenceState>()(
    persist(
        (set, get) => ({
            themeMode: ThemeMode.SYSTEM,
            language: 'auto',
            font: '',
            navBarButtons: { ...defaultNavBarButton },
            setThemeMode: themeMode => set({ themeMode }),
            setLanguage: language => set({ language }),
            getLanguage: () => {
                const currentLanguage = get().language;
                const browserLanguage = navigator.language ?? navigator.languages[0];
                return currentLanguage === FOLLOW_SYSTEM ? browserLanguage : currentLanguage;
            },
            setFont: font => set({ font }),
            setNavBarButton: (key, value) =>
                set(state => ({
                    navBarButtons: { ...state.navBarButtons, [key]: value },
                })),
            toggleShowNavBarButton: key =>
                set(state => ({
                    navBarButtons: {
                        ...state.navBarButtons,
                        [key]: state.navBarButtons[key] === NavBarButton.NAV_BAR ? NavBarButton.SETTING : NavBarButton.NAV_BAR,
                    },
                })),
        }),
        {
            name: 'user-preference', // localStorage key
            // 可以自定义存储方式，如 storage: createJSONStorage(() => sessionStorage)
        }
    )
);
