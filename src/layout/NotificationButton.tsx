import { IconButton, Badge, Tooltip } from '@mui/material';
import NotificationsTwoToneIcon from '@mui/icons-material/NotificationsTwoTone';
import { useTranslation } from 'react-i18next';

const NotificationButton = () => {
    const { t } = useTranslation();

    return (
        <Tooltip title={t('navBar.notification')}>
            <IconButton>
                <Badge variant="dot" badgeContent={4} color="error">
                    <NotificationsTwoToneIcon />
                </Badge>
            </IconButton>
        </Tooltip>
    );
};

export default NotificationButton;
