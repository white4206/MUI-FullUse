import { createTheme } from '@mui/material/styles';

// 增加调色板参数，加入fullUseMain主题色
declare module '@mui/material/styles' {
    interface Palette {
        fullUseMain: Palette['primary'];
        appBarColor: string;
        hoverBgColor: string;
    }

    interface PaletteOptions {
        fullUseMain?: PaletteOptions['primary'];
        appBarColor?: string;
        hoverBgColor?: string;
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
        appBarColor: 'rgba(255,255,255,0.6)',
        hoverBgColor: 'rgba(0,0,0,0.04)',
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
        appBarColor: 'rgba(0,0,0,0.6)',
        hoverBgColor: 'rgba(255,255,255,0.08)',
    },
});
export { lightTheme, darkTheme };
