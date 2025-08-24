import { useBreakpoint } from '@/utils/hook';
import { IconButton, Paper, Typography, Chip, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const SearchButton = () => {
    const theme = useTheme();
    const { xs } = useBreakpoint();
    const { t } = useTranslation();
    const [isExpand, setIsExpand] = useState<boolean>(false);

    return xs ? (
        <IconButton sx={{ borderRadius: 2 }}>
            <SearchIcon sx={{ color: theme.palette.fullUseMain.main }} />
        </IconButton>
    ) : (
        <Paper
            variant="outlined"
            sx={{
                borderRadius: 3,
                m: 1,
                borderWidth: isExpand ? 2 : 0,
                transition: 'border-color .4s',
                '&:hover': { borderColor: theme.palette.fullUseMain.main },
                bgcolor: isExpand ? theme.palette.navBarButtonBgColor : undefined,
            }}
        >
            <IconButton
                sx={{
                    m: 0,
                    borderRadius: isExpand ? 3 : 2,
                    textTransform: 'none',
                    overflow: 'hidden',
                    minWidth: 'auto',
                    justifyContent: 'start',
                    width: isExpand ? 'auto' : 40,
                    p: isExpand ? '6px 8px' : 1,
                    transition: '.4s',
                }}
                onClick={() => setIsExpand(expand => !expand)}
            >
                <SearchIcon sx={{ color: theme.palette.primary.main }} />
                <Typography flexShrink={0} ml={1} mr={3} color={theme.palette.text.secondary} variant="body2">
                    {t('navBar.search')}
                </Typography>
                <Chip size="small" label="Ctrl+K" sx={{ height: 'auto', fontSize: 12, fontWeight: 600, p: 0 }} />
            </IconButton>
        </Paper>
    );
};
export default SearchButton;
