import { IconButton, Menu, MenuItem, Stack, Typography, CardMedia } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import CallMadeIcon from '@mui/icons-material/CallMade';
import useI18n from '@/i18n';
import { useState } from 'react';

const I18nButton = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const i18nOpen = Boolean(anchorEl);
    const { languages, changeLanguage } = useI18n();

    // 语言切换
    const handleChangeLanguage = (language: string) => {
        changeLanguage(language);
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton sx={{ m: 0.5, borderRadius: 2 }} onClick={e => setAnchorEl(e.currentTarget)}>
                <TranslateIcon />
            </IconButton>
            <Menu id="i18n-menu" anchorEl={anchorEl} open={i18nOpen} onClose={() => setAnchorEl(null)}>
                {languages.map(language => {
                    return (
                        <MenuItem key={language.id} onClick={() => handleChangeLanguage(language.language)}>
                            <Stack sx={{ width: 128 }} flex={1} direction="row" justifyContent="space-between" alignItems="center">
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography fontSize={14}>{language.label}</Typography>
                                    <CallMadeIcon sx={{ fontSize: 12 }} />
                                </Stack>
                                <CardMedia component={'img'} sx={{ width: 16, height: 16 }} image={language.icon} />
                            </Stack>
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
};
export default I18nButton;
