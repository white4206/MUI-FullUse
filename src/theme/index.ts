import { createTheme } from '@mui/material/styles';

// 增加调色板参数，加入fullUseMain主题色
declare module '@mui/material/styles' {
    interface Palette {
        fullUseMain: Palette['primary'];
        bgColor: string;
        appBarColor: string;
        buttonBorderColor: string;
        toolboxBgColor: string;
        navBarButtonBgColor: string;
    }

    interface PaletteOptions {
        fullUseMain?: PaletteOptions['primary'];
        bgColor?: string;
        appBarColor?: string;
        buttonBorderColor?: string;
        toolboxBgColor?: string;
        navBarButtonBgColor?: string;
    }
}

// 更新badge,Chip的颜色选项，使其包含fullUseMain主题色选项
declare module '@mui/material/Badge' {
    interface BadgePropsColorOverrides {
        fullUseMain: true;
    }
}
declare module '@mui/material/Chip' {
    interface ChipPropsColorOverrides {
        fullUseMain: true;
    }
}

let lightTheme = createTheme({});
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
        bgColor: '#f2f3f5',
        appBarColor: 'rgba(255,255,255,0.6)',
        buttonBorderColor: lightTheme.palette.grey[300],
        toolboxBgColor: 'rgba(255, 255, 255, 0.6)',
        navBarButtonBgColor: '#f2f3f5',
    },
    components: {
        MuiTooltip: {
            defaultProps: {
                enterDelay: 500,
            },
        },
    },
});
let darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
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
        bgColor: '#0a0a0a',
        appBarColor: 'rgba(18,18,18,0.6)',
        buttonBorderColor: 'rgba(224,224,224,0.1)',
        toolboxBgColor: 'rgba(18,18,18,0.6)',
        navBarButtonBgColor: '#0a0a0a',
    },
    components: {
        MuiTooltip: {
            defaultProps: {
                enterDelay: 500,
            },
        },
    },
});
export { lightTheme, darkTheme };
