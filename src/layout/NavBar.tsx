import { AppBar, Toolbar, IconButton, CardMedia, Box, Typography, useTheme, Divider, Tooltip } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import logo from '@/assets/svg/logo.svg';
import { useRef, useLayoutEffect } from 'react';
import I18nButton from '@/layout/I18nButton';
import { FontButton } from '@/layout/FontButton';
import SearchButton from '@/layout/SearchButton';
import SettingButton from '@/layout/SettingButton';
import NotificationButton from '@/layout/NotificationButton';
import Menu from '@/layout/Menu';
import { useUserPreference } from '@/store';
import { useDark } from '@/utils/hook';
import { useTranslation } from 'react-i18next';
import FullscreenButton from '@/layout/FullscreenButton';

interface NavBarProps {
    setNavBarHeight: (clientHeight: number) => void;
}

const NavBar = ({ props }: { props: NavBarProps }) => {
    const { setNavBarHeight } = props;
    const appBarRef = useRef<HTMLElement>(null);
    const theme = useTheme();
    const navBarButtons = useUserPreference(state => state.navBarButtons);
    const { isDark, toggleThemeWithAnimation } = useDark();
    const { t } = useTranslation();

    useLayoutEffect(() => {
        const updateHeight = () => {
            if (appBarRef.current) {
                setNavBarHeight(appBarRef.current.clientHeight);
            }
        };
        updateHeight(); // 初始化时设置一次

        window.addEventListener('resize', updateHeight);
        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, [setNavBarHeight]);

    return (
        <AppBar
            ref={appBarRef}
            sx={{
                bgcolor: theme.palette.appBarColor,
                backdropFilter: 'blur(8px)',
            }}
        >
            <Toolbar>
                {/* logo */}
                <a href="http://resource.whitecc.top" target="_blank" rel="noreferrer noopener">
                    <CardMedia component={'img'} sx={{ width: 32, transition: '.4s', '&:hover': { transform: 'rotate(180deg)' } }} image={logo} />
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
                    {navBarButtons.theme === 'navBar' && (
                        <Tooltip title={t('navBar.theme')} enterDelay={500}>
                            <IconButton sx={{ borderRadius: 2 }} onClick={e => void toggleThemeWithAnimation(e)}>
                                {isDark ? <LightModeIcon /> : <DarkModeOutlinedIcon />}
                            </IconButton>
                        </Tooltip>
                    )}
                    {/* 国际化切换 */}
                    {navBarButtons.i18n === 'navBar' && <I18nButton />}
                    {/* 字体切换 */}
                    {navBarButtons.font === 'navBar' && <FontButton />}
                    {/* 全屏切换 */}
                    {navBarButtons.fullscreen === 'navBar' && <FullscreenButton />}
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
