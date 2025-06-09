import { useBreakpoint, useDark } from '@/utils/hook';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button, ButtonGroup, Divider, IconButton, Stack, SwipeableDrawer, Tooltip, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useUserPreference } from '@/store';

const SettingButton = () => {
    const [open, setOpen] = useState(false);
    const { sm } = useBreakpoint();
    const theme = useTheme();
    const { t } = useTranslation();
    const { toggleThemeWithAnimation } = useDark();
    const themeMode = useUserPreference(state => state.themeMode);
    const navBarButtons = useUserPreference(state => state.navBarButtons);
    const toggleShowNavBarButton = useUserPreference(state => state.toggleShowNavBarButton);

    return (
        <>
            <IconButton sx={{ borderRadius: 2 }} onClick={() => setOpen(true)}>
                <SettingsIcon sx={{ color: theme.palette.fullUseMain.main }} />
            </IconButton>
            <SwipeableDrawer anchor="right" open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" p={2} width={sm ? 280 : 360}>
                    <Typography fontWeight={500}>{t('navBar.setting')}</Typography>
                    <IconButton onClick={() => setOpen(false)}>
                        <CloseIcon sx={{ color: theme.palette.fullUseMain.main }} />
                    </IconButton>
                </Stack>
                <Divider />
                <Stack p={2}>
                    <Stack mb={1} direction="row" alignItems="center">
                        <Typography fontSize={12} fontWeight={600} textTransform="uppercase" variant="subtitle2" color={theme.palette.text.secondary}>
                            {t('navBar.theme.mode')}
                        </Typography>
                        <Tooltip title={t(navBarButtons.theme === 'navBar' ? 'navBar.invisible' : 'navBar.visible')}>
                            <IconButton size="small" onClick={() => toggleShowNavBarButton('theme')} sx={{ borderRadius: 1, ml: 0.5 }}>
                                {navBarButtons.theme === 'navBar' ? (
                                    <VisibilityIcon sx={{ fontSize: 14, color: theme.palette.fullUseMain.main }} />
                                ) : (
                                    <VisibilityOffIcon sx={{ fontSize: 14 }} />
                                )}
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    <ButtonGroup fullWidth size="large" color="inherit" sx={{ textTransform: 'none' }}>
                        <Button
                            onClick={e => void toggleThemeWithAnimation(e, 'light')}
                            className={themeMode === 'light' ? 'active-theme-button' : ''}
                            sx={{
                                p: 1.5,
                                borderRadius: 3,
                                fontSize: 14,
                                borderColor: theme.palette.themeButtonBorderColor,
                                '&:not(.active-theme-button):hover': { borderRightColor: 'transparent !important' },
                            }}
                        >
                            <LightModeIcon sx={{ fontSize: '1.25rem', mr: 1 }} />
                            {t('navBar.theme.light')}
                        </Button>
                        <Button
                            onClick={e => void toggleThemeWithAnimation(e, 'auto')}
                            className={themeMode === 'auto' ? 'active-theme-button' : ''}
                            sx={{
                                p: 1.5,
                                fontSize: 14,
                                borderColor: theme.palette.themeButtonBorderColor,
                                '&:not(.active-theme-button):hover': { borderRightColor: 'transparent !important' },
                                ml: '0 !important',
                            }}
                        >
                            <SettingsBrightnessIcon sx={{ fontSize: '1.25rem', mr: 1 }} />
                            {t('navBar.theme.system')}
                        </Button>

                        <Button
                            onClick={e => void toggleThemeWithAnimation(e, 'dark')}
                            className={themeMode === 'dark' ? 'active-theme-button' : ''}
                            sx={{
                                p: 1.5,
                                borderRadius: 3,
                                fontSize: 14,
                                borderColor: theme.palette.themeButtonBorderColor,
                                ml: '0 !important',
                            }}
                        >
                            <DarkModeOutlinedIcon sx={{ fontSize: '1.25rem', mr: 1 }} />
                            {t('navBar.theme.dark')}
                        </Button>
                    </ButtonGroup>
                </Stack>
            </SwipeableDrawer>
        </>
    );
};

export default SettingButton;
