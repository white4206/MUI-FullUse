import { useFullScreen } from '@/utils/hook';
import { IconButton, Tooltip } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { useTranslation } from 'react-i18next';

const FullscreenButton = () => {
    const { toggleFullscreen, isFullscreen } = useFullScreen();
    const { t } = useTranslation();

    return (
        <Tooltip title={t('navBar.fullscreen')}>
            <IconButton sx={{ borderRadius: 2 }} onClick={() => toggleFullscreen()}>
                {isFullscreen ? <FullscreenExitIcon></FullscreenExitIcon> : <FullscreenIcon />}
            </IconButton>
        </Tooltip>
    );
};
export default FullscreenButton;
