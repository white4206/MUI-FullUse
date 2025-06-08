import { useBreakpoint } from '@/utils/hook';
import SettingsIcon from '@mui/icons-material/Settings';
import { Divider, IconButton, Stack, SwipeableDrawer, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

const SettingButton = () => {
    const [open, setOpen] = useState(false);
    const { sm } = useBreakpoint();
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <>
            <IconButton sx={{ borderRadius: 2 }} onClick={() => setOpen(true)}>
                <SettingsIcon />
            </IconButton>
            <SwipeableDrawer anchor="right" open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" p={2} width={sm ? 280 : 360}>
                    <Typography fontWeight={500}>{t('navBar.setting')}</Typography>
                    <IconButton>
                        <CloseIcon sx={{ color: theme.palette.fullUseMain.main }} />
                    </IconButton>
                </Stack>
                <Divider />
            </SwipeableDrawer>
        </>
    );
};

export default SettingButton;
