import { Box, Button, Typography, useTheme, SwipeableDrawer, IconButton, Stack, Divider, Paper } from '@mui/material';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import WidgetsTwoToneIcon from '@mui/icons-material/WidgetsTwoTone';
import { useTranslation } from 'react-i18next';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import ArticleTwoToneIcon from '@mui/icons-material/ArticleTwoTone';
import DownloadTwoToneIcon from '@mui/icons-material/DownloadTwoTone';
import VideoLibraryTwoToneIcon from '@mui/icons-material/VideoLibraryTwoTone';
import { useBreakpoint } from '@/utils/hooks';
import SvgIcon from '@/components/SvgIcon';
import { name } from '@/utils/constant';

const Menu = () => {
    const routeLinks = [
        { id: 1, title: 'pages.home.title', path: '/', icon: <HomeTwoToneIcon /> },
        { id: 2, title: 'pages.article.title', path: '/article', icon: <ArticleTwoToneIcon /> },
        { id: 3, title: 'pages.download.title', path: '/download', icon: <DownloadTwoToneIcon /> },
        { id: 4, title: 'pages.video.title', path: '/video', icon: <VideoLibraryTwoToneIcon /> },
    ];
    const theme = useTheme();
    const [open, setOpen] = useState<boolean>(false);
    const { t } = useTranslation();
    const currentPath = useLocation().pathname;
    const { xs } = useBreakpoint();

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
                    {routeLinks.map(routeLink => (
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
                            <Button color="inherit" sx={{ borderRadius: 8 }} size="large" component={Link} to={routeLink.path}>
                                <Typography>{t(routeLink.title)}</Typography>
                            </Button>
                        </Box>
                    ))}
                </Stack>
            </Paper>
            <IconButton sx={{ m: 0.5, display: { lg: 'none', xs: 'flex' } }} onClick={() => setOpen(true)}>
                <WidgetsTwoToneIcon sx={{ color: theme.palette.fullUseMain.main }} />
            </IconButton>
            <SwipeableDrawer elevation={1} anchor="left" open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
                <Stack direction="row" alignItems="center" p={2} width={xs ? 190 : 240}>
                    {/* logo */}
                    <SvgIcon iconName="logo" size="32px" />
                    <Divider variant="middle" orientation="vertical" flexItem sx={{ m: 1, ml: 1, mr: 0 }} />
                    <Typography p={1} color={theme.palette.text.primary}>
                        {name}
                    </Typography>
                </Stack>
                <Divider />
                <Box>
                    {routeLinks.map(routeLink => (
                        <Stack
                            direction="row"
                            alignItems="center"
                            key={routeLink.id}
                            component={Link}
                            to={routeLink.path}
                            className={(currentPath === routeLink.path ? 'active-vertical-menu-item' : '') + ' clear-default'}
                            sx={{ m: 1, borderRadius: 2, transition: '.4s', '&:hover': { bgcolor: theme.palette.action.hover } }}
                        >
                            <IconButton>{routeLink.icon}</IconButton>
                            <Typography ml={2} color={theme.palette.text.primary}>
                                {t(routeLink.title)}
                            </Typography>
                        </Stack>
                    ))}
                </Box>
            </SwipeableDrawer>
        </>
    );
};

export default Menu;
