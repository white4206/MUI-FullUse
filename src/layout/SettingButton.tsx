import { useBreakpoint, useDark, useFullScreen } from '@/utils/hooks';
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
import { FontTypographyList } from '@/layout/FontButton';
import { CustomTextField } from '@/components/FUTextField';

const SettingItemTitle = ({ props }: { props: { title: string; setting: string; canShow?: boolean } }) => {
    const { title, setting, canShow = true } = props;
    const theme = useTheme();
    const { t } = useTranslation();
    const navBarButtons = useUserPreference(state => state.navBarButtons);
    const toggleShowNavBarButton = useUserPreference(state => state.toggleShowNavBarButton);

    return (
        <Divider textAlign="left" sx={{ mb: 1 }}>
            <Stack direction="row" alignItems="center">
                <Typography textTransform="uppercase" variant="caption" color={theme.palette.text.secondary} fontWeight={500}>
                    {t(title)}
                </Typography>
                {canShow && (
                    <Tooltip title={t(`setting.${navBarButtons[setting] === 'navBar' ? 'invisible' : 'visible'}`)} placement="right">
                        <IconButton size="small" onClick={() => toggleShowNavBarButton(setting)} sx={{ borderRadius: 2, ml: 0.5 }}>
                            {navBarButtons[setting] === 'navBar' ? (
                                <VisibilityIcon sx={{ fontSize: '0.875rem', color: theme.palette.fullUseMain.main }} />
                            ) : (
                                <VisibilityOffIcon sx={{ fontSize: '0.875rem' }} />
                            )}
                        </IconButton>
                    </Tooltip>
                )}
            </Stack>
        </Divider>
    );
};

const SettingButton = () => {
    const [open, setOpen] = useState<boolean>(false);
    const { xs } = useBreakpoint();
    const theme = useTheme();
    const { t } = useTranslation();
    const { toggleThemeWithAnimation } = useDark();
    const themeMode = useUserPreference(state => state.themeMode);
    const { languages, changeLanguage } = useI18n();
    const language = useUserPreference(state => state.language);
    const { fonts, changeFont } = useFont();
    const currentFont = useUserPreference(state => state.font);
    const { isFullscreen, toggleFullscreen } = useFullScreen();

    return (
        <>
            <Tooltip title={t('navBar.setting')}>
                <IconButton sx={{ borderRadius: 2 }} onClick={() => setOpen(true)}>
                    <SettingsIcon sx={{ color: theme.palette.fullUseMain.main }} />
                </IconButton>
            </Tooltip>
            <SwipeableDrawer elevation={1} anchor="right" open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
                <Box width={xs ? 280 : 360}>
                    <Stack p={2} direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle1" fontWeight={500}>
                            {t('setting.title')}
                        </Typography>
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
                                        borderRadius: 4,
                                        fontSize: 14,
                                        borderColor: theme.palette.buttonBorderColor,
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
                                        borderColor: theme.palette.buttonBorderColor,
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
                                        borderRadius: 4,
                                        fontSize: 14,
                                        borderColor: theme.palette.buttonBorderColor,
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
                            <CustomTextField select fullWidth value={language} sx={{ '& .MuiInputBase-root': { fontSize: '14px !important' } }}>
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
                            </CustomTextField>
                        </Box>
                        {/* 字体切换 */}
                        <Box mb={1}>
                            <SettingItemTitle props={{ title: 'setting.font.title', setting: 'font' }} />
                            <Box>
                                {fonts.map(font => {
                                    return (
                                        <Accordion
                                            key={font.id}
                                            elevation={3}
                                            sx={{
                                                '&.MuiAccordion-rounded:first-of-type': { borderTopLeftRadius: 8, borderTopRightRadius: 8 },
                                                '&.MuiAccordion-rounded:last-of-type': { borderBottomLeftRadius: 8, borderBottomRightRadius: 8 },
                                            }}
                                        >
                                            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                                <Stack direction="row" alignItems="center">
                                                    <Typography variant="body2" sx={{ fontFamily: `${font.font} !important` }} component="span">
                                                        {font.name}
                                                    </Typography>
                                                    {font.default && (
                                                        <Chip sx={{ ml: 1, fontSize: 12 }} size="small" color="fullUseMain" label={t('setting.font.default')} />
                                                    )}
                                                    {currentFont === font.font && (
                                                        <Chip
                                                            sx={{ ml: 1, fontSize: 12 }}
                                                            variant="outlined"
                                                            size="small"
                                                            color="fullUseMain"
                                                            label={t('setting.font.current')}
                                                        />
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
                        </Box>
                        {/* 全屏切换 */}
                        <Box mb={1}>
                            <SettingItemTitle props={{ title: 'setting.fullscreen.title', setting: 'fullscreen' }} />
                            <Stack direction="row" alignItems="center">
                                <Typography variant="body2">{t('setting.fullscreen.exit')}</Typography>
                                <Switch checked={isFullscreen} onChange={() => toggleFullscreen()} />
                                <Typography variant="body2">{t('setting.fullscreen.enter')}</Typography>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            </SwipeableDrawer>
        </>
    );
};

export default SettingButton;
