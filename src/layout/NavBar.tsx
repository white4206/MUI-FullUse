import { AppBar, Toolbar, IconButton, CardMedia, Box, Button, Typography, useTheme, Menu, MenuItem, Stack } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import TranslateIcon from '@mui/icons-material/Translate';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import logo from '@/assets/svg/logo.svg';
import React, { useRef, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fonts, fontTypographyList, changeFont } from '@/font';
import { languages, changeLanguage } from '@/i18n';

interface NavBarProps {
    isDark: boolean;
    toggleTheme: () => void;
    setNavBarHeight: (clientHeight: number) => void;
}

const routeLinks = [
    { id: 1, name: 'pages.home', to: '/' },
    { id: 2, name: 'pages.article', to: '/article' },
    { id: 3, name: 'pages.download', to: '/download' },
    { id: 4, name: 'pages.video', to: '/video' },
];

const NavBar = ({ props }: { props: NavBarProps }) => {
    const { isDark, toggleTheme, setNavBarHeight } = props;
    const appBarRef = useRef<HTMLElement>(null);
    const theme = useTheme();
    const [i18nAnchorEl, setI18nAnchorEl] = useState<null | HTMLElement>(null);
    const [fontAnchorEl, setFontAnchorEl] = useState<null | HTMLElement>(null);
    const i18nOpen = Boolean(i18nAnchorEl);
    const fontOpen = Boolean(fontAnchorEl);
    const { t, i18n } = useTranslation();

    // 主题切换
    const handleChangeTheme = async (e: React.MouseEvent) => {
        /**
         * 因为在 React 中, setIsDark(!isDark) 是异步的, 状态不会立刻更新.
         * 需要用到切换后的值, 可以提前计算.
         */
        const nextIsDark = !isDark;
        if (!document.startViewTransition) {
            toggleTheme();
        } else {
            // 获取到 transition API 实例
            const transition = document.startViewTransition(() => {
                toggleTheme();
            });
            // 在 transition.ready 的 Promise 完成后，执行自定义动画
            await transition.ready;
            // 由于我们要从鼠标点击的位置开始做动画，所以我们需要先获取到鼠标的位置
            const { clientX, clientY } = e;

            // 计算半径，以鼠标点击的位置为圆心，到四个角的距离中最大的那个作为半径
            const radius = Math.hypot(Math.max(clientX, innerWidth - clientX), Math.max(clientY, innerHeight - clientY));
            const clipPath = [`circle(0% at ${clientX}px ${clientY}px)`, `circle(${radius}px at ${clientX}px ${clientY}px)`];
            // 自定义动画
            document.documentElement.animate(
                {
                    // 如果要切换到暗色主题，我们在过度的时候从半径 100% 的圆开始，到 0% 的圆结束
                    clipPath: nextIsDark ? clipPath.reverse() : clipPath,
                },
                {
                    duration: 500,
                    // 如果要切换到暗色主题，我们应该裁剪 view-transition-old(root) 的内容
                    pseudoElement: nextIsDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
                }
            );
        }
    };

    // 语言切换
    const handleChangeLanguage = (language: string) => {
        changeLanguage(language);
        setI18nAnchorEl(null);
    };

    // 字体切换
    const handleChangeFont = (fontFamily: string) => {
        changeFont(fontFamily);
        setFontAnchorEl(null);
    };

    useLayoutEffect(() => {
        if (appBarRef.current) {
            setNavBarHeight(appBarRef.current.clientHeight);
        }
    }, [isDark]); // 主题切换时也重新获取高度

    return (
        <AppBar ref={appBarRef} sx={{ bgcolor: theme.palette.appBarColor }}>
            <Toolbar>
                {/* logo */}
                <a href="http://resource.whitecc.top" target="_blank" rel="noreferrer noopener">
                    <CardMedia component={'img'} sx={{ width: 32 }} image={logo} />
                </a>
                <Typography p={1} color={theme.palette.text.primary}>
                    MUI-FullUse
                </Typography>
                {/* 导航 */}
                <Box ml={1.5} mr={1.5}>
                    {routeLinks.map(routeLink => {
                        return (
                            <React.Fragment key={routeLink.id}>
                                <Button sx={{ m: 0.5 }} component={Link} to={routeLink.to}>
                                    <Typography color={theme.palette.text.primary}>{t(routeLink.name)}</Typography>
                                </Button>
                            </React.Fragment>
                        );
                    })}
                </Box>
                <Box sx={{ flexGrow: 1 }}></Box>
                {/* 搜索 */}
                <IconButton sx={{ m: 0.5, borderRadius: 2 }}>
                    <SearchIcon />
                </IconButton>
                {/* 主题切换按钮 */}
                <IconButton sx={{ m: 0.5, borderRadius: 2 }} onClick={e => void handleChangeTheme(e)}>
                    {isDark ? <LightModeIcon /> : <DarkModeOutlinedIcon />}
                </IconButton>
                {/* 国际化切换 */}
                <IconButton sx={{ m: 0.5, borderRadius: 2 }} onClick={e => setI18nAnchorEl(e.currentTarget)}>
                    <TranslateIcon />
                </IconButton>
                <Menu id="i18n-menu" anchorEl={i18nAnchorEl} open={i18nOpen} onClose={() => setI18nAnchorEl(null)}>
                    {languages.map(language => {
                        return (
                            <React.Fragment key={language.id}>
                                <MenuItem onClick={() => handleChangeLanguage(language.language)}>
                                    <Stack sx={{ width: 96 }} flex={1} direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography fontSize={14}>{language.label}</Typography>
                                        <CardMedia component={'img'} sx={{ width: 16, height: 16 }} image={language.icon} />
                                    </Stack>
                                </MenuItem>
                            </React.Fragment>
                        );
                    })}
                </Menu>
                {/* 字体切换 */}
                <IconButton sx={{ m: 0.5, borderRadius: 2 }} onClick={e => setFontAnchorEl(e.currentTarget)}>
                    <FontDownloadIcon />
                </IconButton>
                <Menu id="font-menu" anchorEl={fontAnchorEl} open={fontOpen} onClose={() => setFontAnchorEl(null)}>
                    {fonts.map(font => {
                        return (
                            <React.Fragment key={font.id}>
                                <MenuItem onClick={() => handleChangeFont(font.fontFamily)} sx={{ whiteSpace: 'inherit' }}>
                                    <Box sx={{ width: '100%', maxWidth: 520 }}>
                                        <Typography sx={{ fontFamily: `${font.fontFamily} !important`, color: 'teal' }} variant="h3" gutterBottom>
                                            {font.fontName}
                                        </Typography>
                                        {fontTypographyList.map(typography => {
                                            return (
                                                <React.Fragment key={typography.id}>
                                                    <Typography
                                                        sx={{ fontFamily: `${font.fontFamily} !important`, ...typography.sx }}
                                                        variant={typography.variant as import('@mui/material').TypographyProps['variant']}
                                                        gutterBottom
                                                    >
                                                        {typography.content}
                                                    </Typography>
                                                </React.Fragment>
                                            );
                                        })}
                                    </Box>
                                </MenuItem>
                            </React.Fragment>
                        );
                    })}
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
