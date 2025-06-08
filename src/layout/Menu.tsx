import { Box, Button, Typography, useTheme, SwipeableDrawer, IconButton, CardMedia, Stack, Divider } from '@mui/material';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '@/assets/svg/logo.svg';
import { useTranslation } from 'react-i18next';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import DownloadIcon from '@mui/icons-material/Download';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

const Menu = ({ props }: { props: { navBarHeight: number } }) => {
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
    const { navBarHeight } = { ...props };

    return (
        <>
            <Stack direction="row" alignItems="center" display={{ lg: 'flex', xs: 'none' }} ml={1.5} mr={1.5}>
                {routeLinks.map(routeLink => {
                    return (
                        <Box
                            key={routeLink.id}
                            className={currentPath === routeLink.path ? 'active-horizontal-menu-item' : ''}
                            sx={{
                                height: navBarHeight - 8,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Button sx={{ m: 0.5 }} component={Link} to={routeLink.path}>
                                <Typography color={theme.palette.text.primary}>{t(routeLink.title)}</Typography>
                            </Button>
                        </Box>
                    );
                })}
            </Stack>
            <IconButton sx={{ m: 0.5, borderRadius: 2, display: { lg: 'none', xs: 'flex' } }} onClick={() => setOpen(true)}>
                <MenuIcon sx={{ color: theme.palette.fullUseMain.main }} />
            </IconButton>
            <SwipeableDrawer anchor="left" open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
                <Stack direction="row" alignItems="center" p={2} width={240}>
                    {/* logo */}
                    <a href="http://resource.whitecc.top" target="_blank" rel="noreferrer noopener">
                        <CardMedia component={'img'} sx={{ width: 32 }} image={logo} />
                    </a>
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
