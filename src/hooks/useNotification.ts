import { use } from 'react';
import { NotificationContext } from '@/context/NotificationContext';

// 全局通知调用组件
const useNotification = () => {
    const ctx = use(NotificationContext);
    if (!ctx) throw new Error('useNotification must be used within NotificationProvider');
    return ctx.notify;
};

export default useNotification;
