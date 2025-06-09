import { IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const NotificationButton = () => {
    return (
        <>
            <IconButton sx={{ borderRadius: 2 }}>
                <Badge badgeContent={4} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
        </>
    );
};

export default NotificationButton;
