import { useBreakpoint, useDark, useFullScreen } from '@/utils/hook';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    ButtonGroup,
    Chip,
    Divider,
    IconButton,
    MenuItem,
    Stack,
    SwipeableDrawer,
    Switch,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useUserPreference } from '@/store';
import useI18n from '@/i18n';
import useFont from '@/font';
import { FontTypographyList } from './FontButton';

const SettingItemTitle = ({ props }: { props: { title: string; setting: string; canShow?: boolean } }) => {
    const { title, setting, canShow = true } = props;
    const theme = useTheme();
    const { t } = useTranslation();
    const navBarButtons = useUserPreference(state => state.navBarButtons);
    const toggleShowNavBarButton = useUserPreference(state => state.toggleShowNavBarButton);

    return (
        <Stack mb={1} direction="row" alignItems="center">
            <Typography fontSize={12} fontWeight={600} textTransform="uppercase" variant="subtitle2" color={theme.palette.text.secondary}>
                {t(title)}
            </Typography>
            {canShow && (
                <Tooltip title={t(navBarButtons[setting] === 'navBar' ? 'setting.invisible' : 'setting.visible')} placement="right" enterDelay={500}>
                    <IconButton size="small" onClick={() => toggleShowNavBarButton(setting)} sx={{ borderRadius: 1, ml: 0.5 }}>
                        {navBarButtons[setting] === 'navBar' ? (
                            <VisibilityIcon sx={{ fontSize: 14, color: theme.palette.fullUseMain.main }} />
                        ) : (
                            <VisibilityOffIcon sx={{ fontSize: 14 }} />
                        )}
                    </IconButton>
                </Tooltip>
            )}
        </Stack>
    );
};

const SettingButton = () => {
    const [open, setOpen] = useState(false);
    const { sm } = useBreakpoint();
    const theme = useTheme();
    const { t } = useTranslation();
    const { toggleThemeWithAnimation } = useDark();
    const themeMode = useUserPreference(state => state.themeMode);
    const { languages, changeLanguage } = useI18n();
    const language = useUserPreference(state => state.language);
    const { fonts, changeFont } = useFont();
    const { isFullscreen, toggleFullscreen } = useFullScreen();

    return (
        <>
            <Tooltip title={t('navBar.setting')} enterDelay={500}>
                <IconButton sx={{ borderRadius: 2 }} onClick={() => setOpen(true)}>
                    <SettingsIcon sx={{ color: theme.palette.fullUseMain.main }} />
                </IconButton>
            </Tooltip>
            <SwipeableDrawer anchor="right" open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
                <Box p={2} width={sm ? 320 : 360}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography fontWeight={500}>{t('setting.title')}</Typography>
                        <IconButton onClick={() => setOpen(false)}>
                            <CloseIcon sx={{ color: theme.palette.fullUseMain.main }} />
                        </IconButton>
                    </Stack>
                    <Divider />
                    <Stack p={2}>
                        {/* 主题切换 */}
                        <Box mb={1}>
                            <SettingItemTitle props={{ title: 'setting.theme.title', setting: 'theme' }} />
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
                                    {t('setting.theme.light')}
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
                                    {t('setting.theme.auto')}
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
                                    {t('setting.theme.dark')}
                                </Button>
                            </ButtonGroup>
                        </Box>
                        {/* 国际化切换 */}
                        <Box mb={1}>
                            <SettingItemTitle props={{ title: 'setting.i18n.title', setting: 'i18n' }} />
                            <TextField
                                select
                                label={t('setting.i18n.language')}
                                fullWidth
                                value={language}
                                sx={{ mt: 1, '& .MuiInputBase-root': { fontSize: '14px !important' } }}
                            >
                                <MenuItem sx={{ fontSize: 14 }} value="auto" onClick={() => changeLanguage('auto')}>
                                    {t('setting.i18n.auto')}
                                </MenuItem>
                                {languages.map(language => (
                                    <MenuItem
                                        sx={{ fontSize: 14 }}
                                        key={language.id}
                                        value={language.language}
                                        onClick={() => changeLanguage(language.language)}
                                    >
                                        {language.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        {/* 字体切换 */}
                        <Box mb={1}>
                            <SettingItemTitle props={{ title: 'setting.font.title', setting: 'font' }} />
                            {fonts.map(font => {
                                return (
                                    <Accordion key={font.id} disableGutters>
                                        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                            <Stack direction="row" alignItems="center">
                                                <Typography fontSize={14} component="span">
                                                    {font.name}
                                                </Typography>
                                                {font.default && (
                                                    <Chip sx={{ ml: 1, fontSize: 12 }} size="small" color="fullUseMain" label={t('setting.font.default')} />
                                                )}
                                            </Stack>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box sx={{ height: 120, overflow: 'auto' }}>
                                                <FontTypographyList font={font.font} />
                                            </Box>
                                        </AccordionDetails>
                                        <AccordionActions>
                                            <Button onClick={() => changeFont(font.font)}>{t('setting.font.apply')}</Button>
                                        </AccordionActions>
                                    </Accordion>
                                );
                            })}
                        </Box>
                        {/* 全屏切换 */}
                        <Box mb={1}>
                            <SettingItemTitle props={{ title: 'setting.fullscreen.title', setting: 'fullscreen' }} />
                            <Stack direction="row" alignItems="center">
                                <Typography fontSize={14}>{t('setting.fullscreen.exit')}</Typography>
                                <Switch checked={isFullscreen} onChange={() => toggleFullscreen()} />
                                <Typography fontSize={14}>{t('setting.fullscreen.enter')}</Typography>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            </SwipeableDrawer>
        </>
    );
};

export default SettingButton;
