import { IconButton, Badge, Tooltip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useTranslation } from 'react-i18next';

const NotificationButton = () => {
    const { t } = useTranslation();

    return (
        <Tooltip title={t('navBar.notification')}>
            <IconButton sx={{ borderRadius: 2 }}>
                <Badge variant="dot" badgeContent={4} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
        </Tooltip>
    );
};

export default NotificationButton;
