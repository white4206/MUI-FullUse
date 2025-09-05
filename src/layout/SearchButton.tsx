import { useBreakpoint } from '@/hooks';
import { IconButton, Paper, Typography, Modal, Card, CardContent, useTheme, Slide, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const SearchButton = () => {
    const { xs } = useBreakpoint();
    const { t } = useTranslation();
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const theme = useTheme();

    return (
        <>
            <Modal open={isSearch} disableScrollLock onClose={() => setIsSearch(false)} sx={{ backdropFilter: 'blur(2px)', bgcolor: 'searchModalBgColor' }}>
                <Slide
                    in={isSearch}
                    timeout={{
                        // 缓进快出
                        enter: theme.transitions.duration.enteringScreen,
                        exit: 0,
                    }}
                >
                    <Card sx={{ width: 500, height: 500, m: '64px auto' }}>
                        <CardContent>占位</CardContent>
                    </Card>
                </Slide>
            </Modal>
            <Tooltip title={t('navBar.search')}>
                {xs ? (
                    <IconButton color="primary">
                        <SearchIcon />
                    </IconButton>
                ) : (
                    <Paper
                        variant="outlined"
                        sx={{
                            borderRadius: 3,
                            m: 1,
                            borderWidth: isSearch ? 2 : 0,
                            transition: 'border-color .4s',
                            '&:hover': { borderColor: 'primary.main' },
                            bgcolor: isSearch ? 'navBarButtonBgColor' : 'transparent',
                        }}
                    >
                        <IconButton
                            color="primary"
                            sx={{
                                borderRadius: 3,
                                m: 0,
                                textTransform: 'none',
                                overflow: 'hidden',
                                minWidth: 'auto',
                                justifyContent: 'start',
                                width: isSearch ? 'auto' : 40,
                                p: isSearch ? '6px 8px' : 1,
                                transition: 'width .4s',
                            }}
                            onClick={() => setIsSearch(expand => !expand)}
                        >
                            <SearchIcon />
                            <Typography flexShrink={0} ml={1} mr={3} color="text.secondary" variant="body2">
                                {t('navBar.search')}
                            </Typography>
                        </IconButton>
                    </Paper>
                )}
            </Tooltip>
        </>
    );
};
export default SearchButton;
