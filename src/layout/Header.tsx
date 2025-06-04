import { AppBar, Toolbar, IconButton, CardMedia, Box, Button, Typography, useTheme, TextField, InputAdornment } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import logo from '@/assets/svg/logo.svg';
import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    isDark: boolean;
    setIsDark: (isDark: boolean) => void;
    setHeaderHeight: (clientHeight: number) => void;
}

const Header = ({ props }: { props: HeaderProps }) => {
    const { isDark, setIsDark, setHeaderHeight } = props;
    const appBarRef = useRef<HTMLElement>(null);
    const theme = useTheme();

    useLayoutEffect(() => {
        if (appBarRef.current) {
            setHeaderHeight(appBarRef.current.clientHeight);
        }
    }, [isDark]); // 主题切换时也重新获取高度

    return (
        <AppBar ref={appBarRef} sx={{ bgcolor: theme.palette.appBarColor }}>
            <Toolbar>
                <a href="http://resource.whitecc.top" target="_blank">
                    <CardMedia
                        component={'img'}
                        sx={{ width: 32 }}
                        image={logo}
                    />
                </a>
                <Box ml={2} mr={2}>
                    <Button component={Link} to="/">
                        <Typography color={theme.palette.text.secondary}>homepage</Typography>
                    </Button>
                    <Button component={Link} to="/other">
                        <Typography color={theme.palette.text.secondary}>other</Typography>
                    </Button>
                </Box>
                <Box sx={{ flexGrow: 1 }}></Box>
                <Box ml={2} mr={2}>
                    <TextField
                        sx={{
                            '& .MuiInputBase-root': { borderRadius: 2 },
                            width: 196
                        }}
                        size="small"
                        slotProps={{
                            input: {
                                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                            },
                        }} />
                </Box>
                <IconButton onClick={() => setIsDark(!isDark)}>
                    {isDark ? (<LightModeIcon />) : (<DarkModeOutlinedIcon />)}
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Header;