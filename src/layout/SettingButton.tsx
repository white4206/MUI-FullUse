import { useBreakpoint } from '@/utils/hook';
import SettingsIcon from '@mui/icons-material/Settings';
import { Divider, IconButton, Stack, SwipeableDrawer, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { t } from 'i18next';
import CloseIcon from '@mui/icons-material/Close';

const SettingButton = () => {
    const [open, setOpen] = useState(false);
    const { sm } = useBreakpoint();
    const theme = useTheme();

    return (
        <>
            <IconButton sx={{ m: 0.5, borderRadius: 2 }} onClick={() => setOpen(true)}>
                <SettingsIcon />
            </IconButton>
            <SwipeableDrawer anchor="right" open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" p={2} width={sm ? 300 : 360}>
                    <Typography>{t('navBar.setting')}</Typography>
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
