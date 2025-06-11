import { Box, Button, Typography, useTheme, SwipeableDrawer, IconButton, CardMedia, Stack, Divider, Paper } from '@mui/material';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import DownloadIcon from '@mui/icons-material/Download';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { useBreakpoint, useDark } from '@/utils/hook';
import SvgIcon from '@/components/SvgIcon';

const Menu = () => {
    const routeLinks = [
        { id: 1, title: 'pages.home', path: '/', icon: <HomeIcon /> },
        { id: 2, title: 'pages.article', path: '/article', icon: <ArticleIcon /> },
        { id: 3, title: 'pages.download', path: '/download', icon: <DownloadIcon /> },
        { id: 4, title: 'pages.video', path: '/video', icon: <VideoLibraryIcon /> },
    ];
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const currentPath = useLocation().pathname;
    const { xs } = useBreakpoint();
    const { isDark } = useDark();

    return (
        <>
            <Paper
                variant="outlined"
                sx={{
                    display: { lg: 'flex', xs: 'none' },
                    borderRadius: 8,
                    ml: 1,
                    mr: 1,
                    bgcolor: theme.palette.navBarButtonBgColor,
                }}
            >
                <Stack direction="row" alignItems="center">
                    {routeLinks.map(routeLink => {
                        return (
                            <Box
                                mt={0.5}
                                mb={0.5}
                                ml={1}
                                mr={1}
                                display="flex"
                                key={routeLink.id}
                                alignItems="center"
                                className={currentPath === routeLink.path ? 'active-horizontal-menu-item' : ''}
                            >
                                <Button sx={{ borderRadius: 8 }} size="large" component={Link} to={routeLink.path}>
                                    <Typography color={isDark ? theme.palette.fullUseMain.light : theme.palette.fullUseMain.dark}>
                                        {t(routeLink.title)}
                                    </Typography>
                                </Button>
                            </Box>
                        );
                    })}
                </Stack>
            </Paper>
            <IconButton sx={{ m: 0.5, borderRadius: 2, display: { lg: 'none', xs: 'flex' } }} onClick={() => setOpen(true)}>
                <MenuIcon sx={{ color: theme.palette.fullUseMain.main }} />
            </IconButton>
            <SwipeableDrawer anchor="left" open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
                <Stack direction="row" alignItems="center" p={2} width={xs ? 190 : 240}>
                    {/* logo */}
                    <SvgIcon iconName="logo" size="32px" />
                    <Divider variant="middle" orientation="vertical" flexItem sx={{ m: 1, ml: 1, mr: 0 }} />
                    <Typography p={1} color={theme.palette.text.primary}>
                        MUI-FullUse
                    </Typography>
                </Stack>
                <Divider />
                <Box>
                    {routeLinks.map(routeLink => {
                        return (
                            <Stack
                                direction="row"
                                alignItems="center"
                                key={routeLink.id}
                                component={Link}
                                to={routeLink.path}
                                className={(currentPath === routeLink.path ? 'active-vertical-menu-item' : '') + ' clear-default'}
                                sx={{ m: 1, borderRadius: 2, transition: '.2s', '&:hover': { bgcolor: theme.palette.action.hover } }}
                            >
                                <IconButton sx={{ borderRadius: 2 }}>{routeLink.icon}</IconButton>
                                <Typography ml={2} color={theme.palette.text.primary}>
                                    {t(routeLink.title)}
                                </Typography>
                            </Stack>
                        );
                    })}
                </Box>
            </SwipeableDrawer>
        </>
    );
};

export default Menu;
