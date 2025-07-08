import { use } from 'react';
import { FullUseContext } from './FullUseContext';
import { NotificationContext } from './NotificationContext';

// 全局参数
const useFullUse = () => use(FullUseContext);

// 全局通知调用组件
const useNotification = () => {
    const ctx = use(NotificationContext);
    if (!ctx) throw new Error('useNotification must be used within NotificationProvider');
    return ctx.notify;
};

export { useFullUse, useNotification };
