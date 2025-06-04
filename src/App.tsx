import './App.css'
import Header from '@/layout/Header';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '@/theme/index.ts';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/home';
import Other from '@/pages/other';

function App() {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header props={{ isDark, setIsDark, setHeaderHeight }} />
      <Box id="container" p={2} mt={`${headerHeight}px`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/other" element={<Other />} />
        </Routes>
      </Box>
    </ThemeProvider>
  )
}

export default App
