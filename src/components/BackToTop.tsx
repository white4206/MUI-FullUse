import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, useScrollTrigger, Tooltip, Fab } from '@mui/material';
import { useTranslation } from 'react-i18next';

export interface BackToTopProps {
    target?: HTMLElement | null;
    visibilityHeight?: number;
    right?: number;
    bottom?: number;
}

const BackToTop = (props: BackToTopProps) => {
    const { target, visibilityHeight = 200, right = 32, bottom = 32 } = props;
    const { t } = useTranslation();
    const trigger = useScrollTrigger({
        threshold: visibilityHeight, // 滚动超过100px时trigger为true
        disableHysteresis: true, // 立即响应, 不延迟
    });

    const handleBackToTop = () => {
        const scrollTarget = target || document.documentElement;
        scrollTarget.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        trigger && (
            <Tooltip title={t('components.backToTop')}>
                <Box position="fixed" right={right} bottom={bottom}>
                    <Fab size="small" color="primary" onClick={handleBackToTop}>
                        <KeyboardArrowUpIcon />
                    </Fab>
                </Box>
            </Tooltip>
        )
    );
};

export default BackToTop;
