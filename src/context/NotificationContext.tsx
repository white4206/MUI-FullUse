import { createContext, useState, useMemo, useCallback, type ReactNode } from 'react';
import Notification from '@/components/Notification';

type NotifyOptions = Omit<Parameters<typeof Notification>[0], 'open' | 'onClose'>;
interface NotificationContextProps {
    notify: (options: NotifyOptions) => void;
}

const NotificationContext = createContext<NotificationContextProps | null>(null);

const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<NotifyOptions>({ content: '' });

    const notify = useCallback((opts: NotifyOptions) => {
        setOptions(opts);
        setOpen(true);
    }, []);

    const contextValue = useMemo(() => ({ notify }), [notify]);

    return (
        <NotificationContext value={contextValue}>
            {children}
            <Notification key={Date.now() + '_' + Math.random()} open={open} onClose={() => setOpen(false)} {...options} />
        </NotificationContext>
    );
};

export { NotificationContext, NotificationProvider };
