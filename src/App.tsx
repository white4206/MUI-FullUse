import './App.css';
import { lazy } from 'react';
import NavBar from '@/layout/NavBar';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '@/theme/index.ts';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('@/pages/home'));
const Download = lazy(() => import('@/pages/download'));

function App() {
    const [isDark, setIsDark] = useState(false);
    const theme = isDark ? darkTheme : lightTheme;
    const [navBarHeight, setNavBarHeight] = useState(0);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavBar props={{ isDark, setIsDark, setNavBarHeight }} />
            <Box id="container" p={2} mt={`${navBarHeight}px`}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/download" element={<Download />} />
                </Routes>
            </Box>
        </ThemeProvider>
    );
}

export default App;
