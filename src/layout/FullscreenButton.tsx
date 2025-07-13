import { useFullScreen } from '@/utils/hooks';
import { IconButton, Tooltip } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { useTranslation } from 'react-i18next';

const FullscreenButton = () => {
    const { toggleFullscreen, isFullscreen } = useFullScreen();
    const { t } = useTranslation();

    return (
        <Tooltip title={t('navBar.fullscreen')}>
            <IconButton onClick={() => toggleFullscreen()}>{isFullscreen ? <FullscreenExitIcon></FullscreenExitIcon> : <FullscreenIcon />}</IconButton>
        </Tooltip>
    );
};
export default FullscreenButton;
