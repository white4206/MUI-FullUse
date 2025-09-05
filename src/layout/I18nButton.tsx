import { IconButton, Menu, MenuItem, Stack, Typography, Tooltip } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import CallMadeIcon from '@mui/icons-material/CallMade';
import useI18n from '@/i18n';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SvgIcon } from '@/components';
import { languages } from '@/config';

const I18nButton = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const i18nOpen = Boolean(anchorEl);
    const { changeLanguage } = useI18n();
    const { t } = useTranslation();

    // 语言切换
    const handleChangeLanguage = (language: string) => {
        changeLanguage(language);
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title={t('navBar.i18n')}>
                <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
                    <TranslateIcon />
                </IconButton>
            </Tooltip>
            <Menu anchorEl={anchorEl} open={i18nOpen} onClose={() => setAnchorEl(null)}>
                {languages.map(language => (
                    <MenuItem key={language.id} onClick={() => handleChangeLanguage(language.code)} sx={{ m: '0 8px', borderRadius: 2 }}>
                        <Stack sx={{ width: 128 }} flex={1} direction="row" justifyContent="space-between" alignItems="center">
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="body2" mr={0.5}>
                                    {language.label}
                                </Typography>
                                <CallMadeIcon sx={{ fontSize: '0.75rem' }} />
                            </Stack>
                            <SvgIcon iconName={language.code} />
                        </Stack>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};
export default I18nButton;
