import { AppBar, Toolbar, IconButton, CardMedia, Box, Button, Typography, useTheme, TextField, InputAdornment, Menu, MenuItem } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import TranslateIcon from '@mui/icons-material/Translate';
import logo from '@/assets/svg/logo.svg';
import { useRef, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface NavBarProps {
    isDark: boolean;
    setIsDark: (isDark: boolean) => void;
    setNavBarHeight: (clientHeight: number) => void;
}

const NavBar = ({ props }: { props: NavBarProps }) => {
    const { isDark, setIsDark, setNavBarHeight } = props;
    const appBarRef = useRef<HTMLElement>(null);
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { t, i18n } = useTranslation();

    const handleChangeLanguage = (language: string) => {
        void i18n.changeLanguage(language);
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
                {/* 导航 */}
                <Box ml={2} mr={2}>
                    <Button component={Link} to="/">
                        <Typography color={theme.palette.text.secondary}>{t('pages.home')}</Typography>
                    </Button>
                    <Button component={Link} to="/download">
                        <Typography color={theme.palette.text.secondary}>{t('pages.download')}</Typography>
                    </Button>
                </Box>
                <Box sx={{ flexGrow: 1 }}></Box>
                {/* 搜索 */}
                <Box ml={2} mr={2}>
                    <TextField
                        sx={{
                            '& .MuiInputBase-root': { borderRadius: 2 },
                            width: 196,
                        }}
                        size="small"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </Box>
                {/* 主题切换按钮 */}
                <IconButton onClick={() => setIsDark(!isDark)}>{isDark ? <LightModeIcon /> : <DarkModeOutlinedIcon />}</IconButton>
                {/* 国际化切换 */}
                <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
                    <TranslateIcon />
                </IconButton>
                <Menu id="i18n-menu" anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                    <MenuItem onClick={() => handleChangeLanguage('ch')}>简体中文</MenuItem>
                    <MenuItem onClick={() => handleChangeLanguage('en')}>English</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
