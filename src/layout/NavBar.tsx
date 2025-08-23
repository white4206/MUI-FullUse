import { AppBar, Toolbar, IconButton, CardMedia, Box, Typography, Divider, Link, Tooltip } from '@mui/material';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import LightModeTwoToneIcon from '@mui/icons-material/LightModeTwoTone';
import logo from '@/assets/icons/svg/logo.svg';
import { useRef, useLayoutEffect, type Dispatch, type SetStateAction } from 'react';
import I18nButton from '@/layout/I18nButton';
import { FontButton } from '@/layout/FontButton';
import SearchButton from '@/layout/SearchButton';
import SettingButton from '@/layout/SettingButton';
import NotificationButton from '@/layout/NotificationButton';
import Menu from '@/layout/Menu';
import { useUserPreference } from '@/store';
import { useDark } from '@/utils/hooks';
import { useTranslation } from 'react-i18next';
import FullscreenButton from '@/layout/FullscreenButton';
import { name } from '@/utils/constant';
import LoginUser from './LoginUser';

const NavBar = ({ setNavBarHeight }: { setNavBarHeight: Dispatch<SetStateAction<number>> }) => {
    const appBarRef = useRef<HTMLElement>(null);
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
                bgcolor: 'appBarColor',
                backdropFilter: 'blur(8px)',
            }}
            variant="outlined"
        >
            <Toolbar>
                {/* logo */}
                <Link href="http://resource.whitecc.top" target="_blank" rel="noreferrer noopener">
                    <CardMedia component="img" sx={{ width: 32, transition: '.4s', '&:hover': { transform: 'rotate(180deg)' } }} image={logo} alt="logo" />
                </Link>
                <Divider variant="middle" orientation="vertical" flexItem sx={{ m: 2.5, ml: 1, mr: 0, display: { sm: 'block', xs: 'none' } }} />
                <Typography display={{ sm: 'block', xs: 'none' }} p={1} color={'text.primary'}>
                    {name}
                </Typography>
                {/* 导航 */}
                <Menu />
                <Box flexGrow={1}></Box>
                {/* 搜索 */}
                <SearchButton />
                {/* 登录用户 */}
                <LoginUser />
                {/* 功能按钮 */}
                <Box display={{ md: 'block', xs: 'none' }}>
                    {/* 国际化切换 */}
                    {navBarButtons.i18n === 'navBar' && <I18nButton />}
                    {/* 全屏切换 */}
                    {navBarButtons.fullscreen === 'navBar' && <FullscreenButton />}
                    {/* 字体切换 */}
                    {navBarButtons.font === 'navBar' && <FontButton />}
                    {/* 主题切换按钮 */}
                    {navBarButtons.theme === 'navBar' && (
                        <Tooltip title={t('navBar.theme')}>
                            <IconButton onClick={e => void toggleThemeWithAnimation(e)}>
                                {isDark ? <LightModeTwoToneIcon /> : <DarkModeTwoToneIcon />}
                            </IconButton>
                        </Tooltip>
                    )}
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
