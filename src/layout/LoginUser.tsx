import { Avatar, Box, CardActionArea, Grow, Popover, Slide, Zoom } from '@mui/material';
import { useRef, useState } from 'react';

const LoginUser = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

    // 鼠标进入时立即显示
    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setAnchorEl(e.currentTarget);
    };

    // 鼠标离开时延迟关闭
    const handleMouseLeave = () => {
        timerRef.current = setTimeout(() => {
            setAnchorEl(null);
        }, 400); // 200ms延迟防止误关闭
    };

    return (
        <Box m={1} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <CardActionArea sx={{ borderRadius: '50%' }}>
                <Avatar src="http://resource.whitecc.top/prod-api/file/avatar/149f4158-48e2-4759-b077-3c857dcfd3a5.jpg" alt="white" />
            </CardActionArea>
            <Popover
                sx={{
                    pointerEvents: 'none', // 防止Popover拦截鼠标事件 -> 实现鼠标在popover的内容以外的元素(主要是遮罩层)里会触发外层盒子的onMouseLeave事件
                    '& .MuiPopover-paper': {
                        pointerEvents: 'auto', // 允许Popover内容接收鼠标事件 -> 实现鼠标在popover的内容里不会触发外层盒子的onMouseLeave事件
                    },
                }}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                transitionDuration={400} // 过渡动画延迟
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                onClose={() => setAnchorEl(null)}
            >
                <Box width={300} height={400}></Box>
            </Popover>
        </Box>
    );
};
export default LoginUser;
