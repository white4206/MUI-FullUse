import { useBreakpoint } from '@/utils/hook';
import { IconButton, Paper, Button, Typography, Chip, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';

const SearchButton = () => {
    const theme = useTheme();
    const { sm } = useBreakpoint();
    const { t } = useTranslation();

    return (
        <>
            {sm ? (
                <>
                    <IconButton sx={{ m: 0.5, borderRadius: 2 }}>
                        <SearchIcon sx={{ color: theme.palette.fullUseMain.main }} />
                    </IconButton>
                </>
            ) : (
                <>
                    <Paper variant="outlined" elevation={1} sx={{ borderRadius: 3, m: 0.5 }}>
                        <Button sx={{ m: 0, borderRadius: 3, textTransform: 'none' }}>
                            <SearchIcon />
                            <Typography ml={0.5} mr={3} color={theme.palette.text.secondary} fontSize={14}>
                                {t('navBar.search')}
                            </Typography>
                            <Chip size="small" label="Ctrl+K" sx={{ fontSize: 12, fontWeight: 600 }} />
                        </Button>
                    </Paper>
                </>
            )}
        </>
    );
};
export default SearchButton;
