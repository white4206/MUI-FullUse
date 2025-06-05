import { AppBar, Toolbar, IconButton, CardMedia, Box, Button, Typography, useTheme, Menu, MenuItem, Stack } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import TranslateIcon from '@mui/icons-material/Translate';
import logo from '@/assets/svg/logo.svg';
import ch from '@/assets/svg/ch.svg';
import en from '@/assets/svg/en.svg';
import { useRef, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface NavBarProps {
    isDark: boolean;
    toggleTheme: () => void;
    setNavBarHeight: (clientHeight: number) => void;
}

const NavBar = ({ props }: { props: NavBarProps }) => {
    const { isDark, toggleTheme, setNavBarHeight } = props;
    const appBarRef = useRef<HTMLElement>(null);
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { t, i18n } = useTranslation();

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

    const handleChangeLanguage = (language: string) => {
        void i18n.changeLanguage(language);
        // 若切换语言为浏览器当前语言则跟随浏览器变化
        if (navigator.language || navigator.languages[0] === language) localStorage.setItem('i18n', 'auto');
        else localStorage.setItem('i18n', language);
        setAnchorEl(null);
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
                <Box ml={2} mr={2}>
                    <Button component={Link} to="/">
                        <Typography color={theme.palette.text.secondary}>{t('pages.home')}</Typography>
                    </Button>
                    <Button component={Link} to="/article">
                        <Typography color={theme.palette.text.secondary}>{t('pages.article')}</Typography>
                    </Button>
                    <Button component={Link} to="/download">
                        <Typography color={theme.palette.text.secondary}>{t('pages.download')}</Typography>
                    </Button>
                    <Button component={Link} to="/video">
                        <Typography color={theme.palette.text.secondary}>{t('pages.video')}</Typography>
                    </Button>
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
                <IconButton sx={{ m: 0.5, borderRadius: 2 }} onClick={e => setAnchorEl(e.currentTarget)}>
                    <TranslateIcon />
                </IconButton>
                <Menu id="i18n-menu" anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                    <MenuItem onClick={() => handleChangeLanguage('ch')}>
                        <Stack sx={{ width: 96 }} flex={1} direction="row" justifyContent="space-between" alignItems="center">
                            <Typography fontSize={14}>简体中文</Typography>
                            <CardMedia component={'img'} sx={{ width: 16, height: 16 }} image={ch} />
                        </Stack>
                    </MenuItem>
                    <MenuItem onClick={() => handleChangeLanguage('en')}>
                        <Stack sx={{ width: 96 }} flex={1} direction="row" justifyContent="space-between" alignItems="center">
                            <Typography fontSize={14}>English</Typography>
                            <CardMedia component={'img'} sx={{ width: 16, height: 16 }} image={en} />
                        </Stack>
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
