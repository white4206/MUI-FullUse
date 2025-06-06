import { useBreakpoint } from '@/utils/hook';
import { IconButton, Paper, Button, Typography, Chip, useTheme } from '@mui/material';
import { t } from 'i18next';
import SearchIcon from '@mui/icons-material/Search';

const SearchButton = () => {
    const theme = useTheme();
    const { sm } = useBreakpoint();

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
                    <Paper variant="outlined" elevation={1} sx={{ borderRadius: 3 }}>
                        <Button sx={{ m: 0, borderRadius: 3, textTransform: 'none' }}>
                            <SearchIcon />
                            <Typography mr={3} fontSize={14}>
                                {t('navBar.search')}
                            </Typography>
                            <Chip size="small" label="Ctrl+K" sx={{ fontSize: 12 }} />
                        </Button>
                    </Paper>
                </>
            )}
        </>
    );
};
export default SearchButton;
