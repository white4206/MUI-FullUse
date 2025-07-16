import { useBreakpoint } from '@/utils/hooks';
import { IconButton, Paper, Typography, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const SearchButton = () => {
    const { xs } = useBreakpoint();
    const { t } = useTranslation();
    const [isExpand, setIsExpand] = useState<boolean>(false);

    return xs ? (
        <IconButton>
            <SearchIcon sx={{ color: 'primary.main' }} />
        </IconButton>
    ) : (
        <Paper
            variant="outlined"
            sx={{
                borderRadius: 4,
                m: 1,
                borderWidth: isExpand ? 2 : 0,
                transition: 'border-color .4s',
                '&:hover': { borderColor: 'primary.main' },
                bgcolor: isExpand ? 'navBarButtonBgColor' : undefined,
            }}
        >
            <IconButton
                sx={{
                    borderRadius: 4,
                    m: 0,
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
                <SearchIcon sx={{ color: 'primary.main' }} />
                <Typography flexShrink={0} ml={1} mr={3} color={'text.secondary'} variant="body2">
                    {t('navBar.search')}
                </Typography>
                <Chip size="small" label="Ctrl+K" sx={{ height: 'auto', fontSize: 12, fontWeight: 600, p: 0 }} />
            </IconButton>
        </Paper>
    );
};
export default SearchButton;
