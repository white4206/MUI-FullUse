import { Box, Button, Typography, useTheme, SwipeableDrawer, IconButton, CardMedia, Stack, Divider } from '@mui/material';
import { t } from 'i18next';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '@/assets/svg/logo.svg';

const Menu = () => {
    const routeLinks = [
        { id: 1, name: 'pages.home', to: '/' },
        { id: 2, name: 'pages.article', to: '/article' },
        { id: 3, name: 'pages.download', to: '/download' },
        { id: 4, name: 'pages.video', to: '/video' },
    ];
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    return (
        <>
            <Box display={{ lg: 'block', xs: 'none' }} ml={1.5} mr={1.5}>
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
            <IconButton sx={{ m: 0.5, borderRadius: 2, display: { lg: 'none', xs: 'flex' } }} onClick={() => setOpen(true)}>
                <MenuIcon sx={{ color: theme.palette.fullUseMain.main }} />
            </IconButton>
            <SwipeableDrawer anchor="left" open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
                <Stack direction="row" alignItems="center" p={2} width={300}>
                    {/* logo */}
                    <a href="http://resource.whitecc.top" target="_blank" rel="noreferrer noopener">
                        <CardMedia component={'img'} sx={{ width: 32 }} image={logo} />
                    </a>
                    <Divider variant="middle" orientation="vertical" flexItem sx={{ m: 1, ml: 1, mr: 0, display: { sm: 'none', xs: 'block' } }} />
                    <Typography display={{ sm: 'none', xs: 'block' }} p={1} color={theme.palette.text.primary}>
                        MUI-FullUse
                    </Typography>
                </Stack>
                <Divider />
            </SwipeableDrawer>
        </>
    );
};

export default Menu;
