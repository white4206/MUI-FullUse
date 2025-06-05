import '@/App.css';
import { lazy } from 'react';
import NavBar from '@/layout/NavBar';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '@/theme/index.ts';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDark } from '@/utils/hook';
import RouteProgress from '@/components/RouteProgress';

const Home = lazy(() => import('@/pages/home'));
const Article = lazy(() => import('@/pages/article'));
const Download = lazy(() => import('@/pages/download'));
const Video = lazy(() => import('@/pages/video'));

function App() {
    const { isDark, toggleTheme } = useDark();
    const theme = isDark ? darkTheme : lightTheme;
    const [navBarHeight, setNavBarHeight] = useState(0);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouteProgress />
            <NavBar props={{ isDark, toggleTheme, setNavBarHeight }} />
            <Box id="container" p={2} mt={`${navBarHeight}px`}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/article" element={<Article />} />
                    <Route path="/download" element={<Download />} />
                    <Route path="/video" element={<Video />} />
                </Routes>
            </Box>
        </ThemeProvider>
    );
}

export default App;
