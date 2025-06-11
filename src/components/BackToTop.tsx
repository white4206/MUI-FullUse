import { useDark } from '@/utils/hook';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton, Box, useScrollTrigger, useTheme, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface BackToTopProps {
    target?: HTMLElement | null;
    visibilityHeight?: number;
    right?: number;
    bottom?: number;
}

const BackToTop = (props: BackToTopProps) => {
    const { target, visibilityHeight = 200, right = 32, bottom = 32 } = props;
    const theme = useTheme();
    const { t } = useTranslation();
    const { isDark } = useDark();
    const trigger = useScrollTrigger({
        threshold: visibilityHeight, // 滚动超过100px时trigger为true
        disableHysteresis: true, // 立即响应，不延迟});
    });

    const handleBackToTop = () => {
        const scrollTarget = target || document.documentElement;
        scrollTarget.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        trigger && (
            <Tooltip title={t('backToTop')} placement="left" enterDelay={500}>
                <Box position="fixed" right={right} bottom={bottom}>
                    <IconButton sx={{ backdropFilter: 'blur(8px)' }} className="back-to-top-button" color="primary" onClick={handleBackToTop}>
                        <KeyboardArrowUpIcon sx={{ color: theme.palette.fullUseMain[isDark ? 'light' : 'dark'] }} />
                    </IconButton>
                </Box>
            </Tooltip>
        )
    );
};
export default BackToTop;
