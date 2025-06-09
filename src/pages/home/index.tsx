import { useUserPreference } from '@/store';
import { Box, Button } from '@mui/material';
import { useShallow } from 'zustand/shallow';

const Home = () => {
    const [themeMode, language, font] = useUserPreference(useShallow(state => [state.themeMode, state.language, state.font]));

    return (
        <>
            <Box>当前用户首选项</Box>
            <Box>{themeMode}</Box>
            <Box>{language}</Box>
            <Box>{font}</Box>
        </>
    );
};

export default Home;
