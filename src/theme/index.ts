import { createTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material';

// 增加调色板参数，加入fullUseMain主题色
declare module '@mui/material/styles' {
    interface Palette {
        fullUseMain: Palette['primary'];
        bgColor: string;
        appBarColor: string;
        navBarButtonBgColor: string;
        inputBgColor: string;
        buttonBorderColor: string;
        toolboxBgColor: string;
    }

    interface PaletteOptions {
        fullUseMain?: PaletteOptions['primary'];
        bgColor?: string;
        appBarColor?: string;
        navBarButtonBgColor?: string;
        inputBgColor?: string;
        buttonBorderColor?: string;
        toolboxBgColor?: string;
    }
}

let lightTheme = createTheme({ palette: { mode: 'light' } });
lightTheme = createTheme(lightTheme, {
    // 用augmentColor创建的自定义主题色
    palette: {
        primary: lightTheme.palette.augmentColor({
            color: {
                main: '#9286d1',
            },
            name: 'fullUseMain',
        }),
        fullUseMain: lightTheme.palette.augmentColor({
            color: {
                main: '#9286d1',
            },
            name: 'fullUseMain',
        }),
        bgColor: 'rgba(242, 243, 245)',
        appBarColor: 'rgba(255,255,255,0.6)',
        navBarButtonBgColor: 'rgba(242, 243, 245)',
        inputBgColor: 'rgba(245, 245, 245)',
        buttonBorderColor: 'rgba(224,224,224)',
        toolboxBgColor: 'rgba(255, 255, 255, 0.6)',
    },
    components: {
        MuiTooltip: {
            defaultProps: {
                enterDelay: 500,
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: () => ({
                    borderRadius: 8,
                }),
            },
        },
        MuiButton: {
            styleOverrides: {
                root: () => ({
                    borderRadius: 8,
                }),
            },
        },
        MuiPopover: {
            styleOverrides: {
                root: () => ({
                    '& .MuiPopover-paper': {
                        borderRadius: 16,
                    },
                }),
            },
        },
        MuiDialog: {
            styleOverrides: {
                root: () => ({
                    '& .MuiDialog-paper': { borderRadius: 16 },
                }),
            },
        },
        MuiCard: {
            styleOverrides: {
                root: () => ({
                    borderRadius: 16,
                }),
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                InputProps: {
                    notched: false, // 关闭MUI默认的为Label预留的border缺口
                },
            },
            styleOverrides: {
                root: ({ theme }: { theme: Theme }) => ({
                    marginBottom: 0,
                    '& .MuiInputBase-root': {
                        borderRadius: 16,
                        backgroundColor: theme.palette.inputBgColor,
                        fontSize: '0.875rem',
                    },
                    '& .MuiInputBase-root .MuiOutlinedInput-notchedOutline': {
                        transition: 'border-color .4s',
                        borderWidth: 2,
                        borderColor: 'transparent',
                    },
                    '& .MuiInputBase-root:not(.Mui-disabled):hover .MuiOutlinedInput-notchedOutline, & .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                        {
                            borderColor: theme.palette.primary.main,
                        },
                }),
            },
        },
    },
});
let darkTheme = createTheme({ palette: { mode: 'dark' } });
darkTheme = createTheme(darkTheme, {
    // 用augmentColor创建的自定义主题色
    palette: {
        primary: darkTheme.palette.augmentColor({
            color: {
                main: '#9286d1',
            },
            name: 'fullUseMain',
        }),
        fullUseMain: darkTheme.palette.augmentColor({
            color: {
                main: '#9286d1',
            },
            name: 'fullUseMain',
        }),
        bgColor: 'rgba(10, 10, 10)',
        appBarColor: 'rgba(18,18,18,0.6)',
        navBarButtonBgColor: 'rgba(10, 10, 10)',
        inputBgColor: 'rgba(18,18,18,0.6)',
        buttonBorderColor: 'rgba(224,224,224,0.1)',
        toolboxBgColor: 'rgba(18,18,18,0.6)',
    },
    components: {
        MuiTooltip: {
            defaultProps: {
                enterDelay: 500,
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: () => ({
                    borderRadius: 8,
                }),
            },
        },
        MuiButton: {
            styleOverrides: {
                root: () => ({
                    borderRadius: 8,
                }),
            },
        },
        MuiAccordion: {
            styleOverrides: {
                root: () => ({
                    '&.MuiAccordion-rounded:first-of-type': { borderTopLeftRadius: 16, borderTopRightRadius: 16 },
                    '&.MuiAccordion-rounded:last-of-type': { borderBottomLeftRadius: 16, borderBottomRightRadius: 16 },
                }),
            },
        },
        MuiPopover: {
            styleOverrides: {
                root: () => ({
                    '& .MuiPopover-paper': {
                        borderRadius: 16,
                    },
                }),
            },
        },
        MuiDialog: {
            styleOverrides: {
                root: () => ({
                    '& .MuiDialog-paper': { borderRadius: 16 },
                }),
            },
        },
        MuiCard: {
            styleOverrides: {
                root: () => ({
                    borderRadius: 16,
                }),
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                InputProps: {
                    notched: false, // 关闭MUI默认的为Label预留的border缺口
                },
            },
            styleOverrides: {
                root: ({ theme }: { theme: Theme }) => ({
                    marginBottom: 0,
                    '& .MuiInputBase-root': {
                        borderRadius: 16,
                        backgroundColor: theme.palette.inputBgColor,
                        fontSize: '0.875rem',
                    },
                    '& .MuiInputBase-root .MuiOutlinedInput-notchedOutline': {
                        transition: 'border-color .4s',
                        borderWidth: 0,
                    },
                    '& .MuiInputBase-root:not(.Mui-disabled):hover .MuiOutlinedInput-notchedOutline, & .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                        {
                            borderWidth: 2,
                            borderColor: theme.palette.primary.main,
                        },
                }),
            },
        },
    },
});
export { lightTheme, darkTheme };
