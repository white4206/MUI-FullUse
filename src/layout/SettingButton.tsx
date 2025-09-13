import { useBreakpoint, useDark, useFullScreen } from '@/hooks';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import SettingsBrightnessTwoToneIcon from '@mui/icons-material/SettingsBrightnessTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import LightModeTwoToneIcon from '@mui/icons-material/LightModeTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
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
    TextField,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavBarButton, useUserPreference } from '@/store';
import useI18n from '@/i18n';
import useFont from '@/font';
import { FontTypographyList } from '@/layout/FontButton';
import { ThemeMode } from '@/constant';
import { fonts, languages } from '@/config';

const SettingItemTitle = ({ props }: { props: { title: string; setting: string; canShow?: boolean } }) => {
    const { title, setting, canShow = true } = props;
    const { t } = useTranslation();
    const navBarButtons = useUserPreference(state => state.navBarButtons);
    const toggleShowNavBarButton = useUserPreference(state => state.toggleShowNavBarButton);

    return (
        <Divider textAlign="left" sx={{ mb: 1, borderStyle: 'dashed' }}>
            <Stack direction="row" alignItems="center">
                <Typography textTransform="uppercase" variant="caption" color="text.secondary" fontWeight={500}>
                    {t(title)}
                </Typography>
                {canShow && (
                    <Tooltip title={t(`setting.${navBarButtons[setting] === NavBarButton.NAV_BAR ? 'invisible' : 'visible'}`)} placement="right">
                        <IconButton
                            color={navBarButtons[setting] === NavBarButton.NAV_BAR ? 'primary' : undefined}
                            size="small"
                            onClick={() => toggleShowNavBarButton(setting)}
                            sx={{ ml: 0.5 }}
                        >
                            {navBarButtons[setting] === NavBarButton.NAV_BAR ? (
                                <VisibilityTwoToneIcon sx={{ fontSize: '0.875rem' }} />
                            ) : (
                                <VisibilityOffTwoToneIcon sx={{ fontSize: '0.875rem' }} />
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
    const { t } = useTranslation();
    const { toggleThemeWithAnimation } = useDark();
    const themeMode = useUserPreference(state => state.themeMode);
    const { changeLanguage } = useI18n();
    const language = useUserPreference(state => state.language);
    const { changeFont } = useFont();
    const currentFont = useUserPreference(state => state.font);
    const { isFullscreen, toggleFullscreen } = useFullScreen();

    return (
        <>
            <Tooltip title={t('navBar.setting')}>
                <IconButton color="primary" onClick={() => setOpen(true)}>
                    <SettingsTwoToneIcon />
                </IconButton>
            </Tooltip>
            <SwipeableDrawer
                elevation={1}
                anchor="right"
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        borderTopLeftRadius: 16,
                        borderBottomLeftRadius: 16,
                    },
                }}
            >
                <Box width={xs ? 280 : 360}>
                    <Stack p={2} direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle1" fontWeight={500}>
                            {t('setting.title')}
                        </Typography>
                        <IconButton color="primary" onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <Stack p={2} pt={0}>
                        {/* 主题切换 */}
                        <Box mb={1}>
                            <SettingItemTitle props={{ title: 'setting.theme.title', setting: 'theme' }} />
                            <ButtonGroup
                                fullWidth
                                size="large"
                                color="inherit"
                                sx={{
                                    '& .MuiButton-root': {
                                        ml: 0,
                                        p: 1.5,
                                        fontSize: 14,
                                        borderWidth: 2,
                                        borderColor: 'buttonBorderColor',
                                    },
                                    '& .MuiButton-root:hover': {
                                        borderColor: 'buttonBorderColor',
                                    },
                                    '& .MuiButton-root:not(:first-of-type)': {
                                        ml: -0.25,
                                    },
                                }}
                            >
                                <Button
                                    onClick={e => void toggleThemeWithAnimation(e, ThemeMode.LIGHT)}
                                    className={themeMode === ThemeMode.LIGHT ? 'active-theme-button' : ''}
                                    sx={{ borderRadius: 4 }}
                                >
                                    <LightModeTwoToneIcon sx={{ fontSize: '1.25rem', mr: 1 }} />
                                    {t('setting.theme.light')}
                                </Button>
                                <Button
                                    onClick={e => void toggleThemeWithAnimation(e, ThemeMode.SYSTEM)}
                                    className={themeMode === ThemeMode.SYSTEM ? 'active-theme-button' : ''}
                                >
                                    <SettingsBrightnessTwoToneIcon sx={{ fontSize: '1.25rem', mr: 1 }} />
                                    {t('setting.theme.auto')}
                                </Button>

                                <Button
                                    onClick={e => void toggleThemeWithAnimation(e, ThemeMode.DARK)}
                                    className={themeMode === ThemeMode.DARK ? 'active-theme-button' : ''}
                                    sx={{ borderRadius: 4 }}
                                >
                                    <DarkModeTwoToneIcon sx={{ fontSize: '1.25rem', mr: 1 }} />
                                    {t('setting.theme.dark')}
                                </Button>
                            </ButtonGroup>
                        </Box>
                        {/* 国际化切换 */}
                        <Box mb={1}>
                            <SettingItemTitle props={{ title: 'setting.i18n.title', setting: 'i18n' }} />
                            <TextField select fullWidth value={language} sx={{ '& .MuiInputBase-root': { fontSize: '14px !important' } }}>
                                <MenuItem sx={{ fontSize: 14 }} value="auto" onClick={() => changeLanguage(ThemeMode.SYSTEM)}>
                                    {t('setting.i18n.auto')}
                                </MenuItem>
                                {languages.map(language => (
                                    <MenuItem sx={{ fontSize: 14 }} key={language.id} value={language.code} onClick={() => changeLanguage(language.code)}>
                                        {language.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        {/* 字体切换 */}
                        <Box mb={1}>
                            <SettingItemTitle props={{ title: 'setting.font.title', setting: 'font' }} />
                            <Box>
                                {fonts.map(font => (
                                    <Accordion key={font.id} elevation={3}>
                                        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                            <Stack direction="row" alignItems="center">
                                                <Typography variant="body2" sx={{ fontFamily: `${font.font} !important` }} component="span">
                                                    {font.name}
                                                </Typography>
                                                {font.default && (
                                                    <Chip sx={{ ml: 1, fontSize: 12 }} size="small" color="primary" label={t('setting.font.default')} />
                                                )}
                                                {currentFont === font.font && (
                                                    <Chip
                                                        sx={{ ml: 1, fontSize: 12 }}
                                                        variant="outlined"
                                                        size="small"
                                                        color="primary"
                                                        label={t('setting.font.current')}
                                                    />
                                                )}
                                            </Stack>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box height={120} overflow="auto">
                                                <FontTypographyList font={font.font} />
                                            </Box>
                                        </AccordionDetails>
                                        <AccordionActions>
                                            <Button onClick={() => changeFont(font.font)}>{t('setting.font.apply')}</Button>
                                        </AccordionActions>
                                    </Accordion>
                                ))}
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
