import { createContext, type ReactNode } from 'react';
import { NotificationProvider } from '@/context/NotificationContext';

interface FullUseContextProps {}
const FullUseContext = createContext<FullUseContextProps | null>(null);

const FullUseProvider = ({ children, ...props }: { children: ReactNode } & FullUseContextProps) => (
    <FullUseContext value={props}>
        <NotificationProvider>{children}</NotificationProvider>
    </FullUseContext>
);
export { FullUseContext, FullUseProvider };
