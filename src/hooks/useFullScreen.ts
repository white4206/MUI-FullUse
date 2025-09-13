import { useCallback, useEffect, useRef, useState } from 'react';
import screenfull from 'screenfull';

const useFullScreen = (target = document.documentElement) => {
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const targetRef = useRef<HTMLElement | null>(target);

    // 进入全屏
    const enterFullscreen = useCallback(() => {
        if (screenfull.isEnabled && targetRef.current) {
            void screenfull.request(targetRef.current);
        }
    }, []);

    // 退出全屏
    const exitFullscreen = useCallback(() => {
        if (screenfull.isEnabled) {
            void screenfull.exit();
        }
    }, []);

    // 切换全屏
    const toggleFullscreen = useCallback(() => {
        if (screenfull.isEnabled) {
            if (screenfull.isFullscreen) {
                void screenfull.exit();
            } else if (targetRef.current) {
                void screenfull.request(targetRef.current);
            }
        }
    }, []);

    // 监听全屏状态变化
    useEffect(() => {
        if (!screenfull.isEnabled) return;
        const handler = () => setIsFullscreen(screenfull.isFullscreen);
        screenfull.on('change', handler);
        return () => {
            screenfull.off('change', handler);
        };
    }, []);

    return {
        isFullscreen,
        enterFullscreen,
        exitFullscreen,
        toggleFullscreen,
    };
};

export default useFullScreen;
