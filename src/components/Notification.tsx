import { Alert, Snackbar, Zoom } from '@mui/material';
import type { AlertColor, AlertProps, SnackbarOrigin, SnackbarProps } from '@mui/material';

interface NotificationProps {
    open: boolean;
    option?: { snackbarProps: SnackbarProps; alertProps: AlertProps };
    content: string;
    type?: AlertColor;
    variant?: 'standard' | 'filled' | 'outlined';
    position?: SnackbarOrigin;
    autoHideDuration?: number;
    onClose?: (event: React.SyntheticEvent | Event, reason: string) => void;
}

const defaultPosition: SnackbarOrigin = { vertical: 'top', horizontal: 'right' };

const Notification = (props: NotificationProps) => {
    const { open, position = defaultPosition, autoHideDuration = 3000, onClose, option, type = 'success', variant = 'standard', content } = props;

    return (
        <Snackbar
            {...(option?.snackbarProps || {})}
            slots={{ transition: Zoom }}
            open={open}
            anchorOrigin={position}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
        >
            <Alert {...(option?.alertProps || {})} severity={type} variant={variant}>
                {content}
            </Alert>
        </Snackbar>
    );
};

export default Notification;
