import '@/App.css';
import { lazy, useEffect } from 'react';
import NavBar from '@/layout/NavBar';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDark } from '@/utils/hook';
import RouteProgress from '@/components/RouteProgress';
import { useUserPreference } from '@/store/module/userPreference';
import useFont from '@/font';
import BackToTop from '@/components/BackToTop';

const Home = lazy(() => import('@/pages/home'));
const Article = lazy(() => import('@/pages/article'));
const Download = lazy(() => import('@/pages/download'));
const Video = lazy(() => import('@/pages/video'));

const App = () => {
    const { theme } = useDark();
    const [navBarHeight, setNavBarHeight] = useState(0);
    const font = useUserPreference(state => state.font);
    const loadFromStorage = useUserPreference(state => state.loadFromStorage);
    const { changeFont } = useFont();

    console.log(theme);

    // 加载用户首选项
    useEffect(() => {
        loadFromStorage();
    }, [loadFromStorage]);

    // 页面加载时读取用户字体首选项
    useEffect(() => {
        changeFont(font);
    }, [changeFont, font]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouteProgress />
            <NavBar props={{ setNavBarHeight }} />
            <Box id="container" p={2} mt={`${navBarHeight}px`}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/article" element={<Article />} />
                    <Route path="/download" element={<Download />} />
                    <Route path="/video" element={<Video />} />
                </Routes>
                <BackToTop />
            </Box>
        </ThemeProvider>
    );
};

export default App;
