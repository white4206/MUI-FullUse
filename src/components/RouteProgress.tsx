import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NProgress from '@/nprogress/index';

const RouteProgress = () => {
    const location = useLocation();

    useEffect(() => {
        NProgress.start();
        // 如果页面有异步加载，可以在数据加载完成后调用 NProgress.done()
        const timer = setTimeout(() => {
            NProgress.done();
        }, 200);
        // 这里直接在组件渲染后立即结束，避免进度条卡住
        // 清理函数确保进度条不会残留
        return () => {
            clearTimeout(timer);
            NProgress.done();
        };
    }, [location.pathname]);

    return null;
};

export default RouteProgress;
