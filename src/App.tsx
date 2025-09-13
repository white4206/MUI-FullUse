import '@/App.css';
import { lazy, useEffect } from 'react';
import NavBar from '@/layout/NavBar';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDark } from '@/hooks';
import { RouteProgress, BackToTop } from '@/components';
import useFont from '@/font';
import { FullUseProvider } from '@/context/FullUseContext';

const Home = lazy(() => import('@/pages/home'));
const Article = lazy(() => import('@/pages/article'));
const Download = lazy(() => import('@/pages/download'));
const Video = lazy(() => import('@/pages/video'));

const App = () => {
    const { theme } = useDark();
    const [navBarHeight, setNavBarHeight] = useState<number>(0);
    const { initFont } = useFont();

    console.log(theme);

    useEffect(() => {
        // 初始化字体
        initFont();
    }, [initFont]);

    return (
        <ThemeProvider theme={theme}>
            <FullUseProvider>
                <CssBaseline />
                <RouteProgress />
                <NavBar setNavBarHeight={setNavBarHeight} />
                <Box id="container" mt={`${navBarHeight}px`}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/article" element={<Article />} />
                        <Route path="/download" element={<Download />} />
                        <Route path="/video" element={<Video />} />
                    </Routes>
                    <BackToTop />
                </Box>
            </FullUseProvider>
        </ThemeProvider>
    );
};

export default App;
