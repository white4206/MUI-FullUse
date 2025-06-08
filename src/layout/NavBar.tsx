import { AppBar, Toolbar, IconButton, CardMedia, Box, Typography, useTheme, Divider } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import logo from '@/assets/svg/logo.svg';
import React, { useRef, useLayoutEffect } from 'react';
import I18nButton from '@/layout/I18nButton';
import FontButton from '@/layout/FontButton';
import SearchButton from '@/layout/SearchButton';
import SettingButton from '@/layout/SettingButton';
import NotificationButton from '@/layout/NotificationButton';
import Menu from '@/layout/Menu';

interface NavBarProps {
    isDark: boolean;
    toggleTheme: () => void;
    navBarHeight: number;
    setNavBarHeight: (clientHeight: number) => void;
}

const NavBar = ({ props }: { props: NavBarProps }) => {
    const { isDark, toggleTheme, navBarHeight, setNavBarHeight } = props;
    const appBarRef = useRef<HTMLElement>(null);
    const theme = useTheme();

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

    useLayoutEffect(() => {
        if (appBarRef.current) {
            setNavBarHeight(appBarRef.current.clientHeight);
        }
    }, [navBarHeight, setNavBarHeight]); // 主题切换时也重新获取高度

    return (
        <AppBar ref={appBarRef} sx={{ bgcolor: theme.palette.appBarColor, backdropFilter: 'blur(8px)' }}>
            <Toolbar>
                {/* logo */}
                <a href="http://resource.whitecc.top" target="_blank" rel="noreferrer noopener">
                    <CardMedia component={'img'} sx={{ width: 32 }} image={logo} />
                </a>
                <Divider variant="middle" orientation="vertical" flexItem sx={{ m: 2.5, ml: 1, mr: 0, display: { sm: 'block', xs: 'none' } }} />
                <Typography display={{ sm: 'block', xs: 'none' }} p={1} color={theme.palette.text.primary}>
                    MUI-FullUse
                </Typography>
                {/* 导航 */}
                <Menu />
                <Box sx={{ flexGrow: 1 }}></Box>
                {/* 搜索 */}
                <SearchButton />
                {/* 功能按钮 */}
                <Box display={{ md: 'block', xs: 'none' }}>
                    {/* 主题切换按钮 */}
                    <IconButton sx={{ m: 0.5, borderRadius: 2 }} onClick={e => void handleChangeTheme(e)}>
                        {isDark ? <LightModeIcon /> : <DarkModeOutlinedIcon />}
                    </IconButton>
                    {/* 国际化切换 */}
                    <I18nButton />
                    {/* 字体切换 */}
                    <FontButton />
                </Box>
                {/* 消息通知 */}
                <NotificationButton />
                {/* 设置 */}
                <SettingButton />
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
