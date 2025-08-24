import {
    Avatar,
    Box,
    CardActionArea,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Popover,
    Stack,
    Typography,
    type SxProps,
} from '@mui/material';
import { useRef, useState } from 'react';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import DoorFrontTwoToneIcon from '@mui/icons-material/DoorFrontTwoTone';

const ListItemSx: SxProps = {
    pt: 0,
    pb: 0,
};
const ListButtonItemSx: SxProps = {
    borderRadius: 4,
};

const LoginUser = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

    // 鼠标进入时延迟显示
    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
        // 清除可能存在的关闭定时器
        if (timerRef.current) clearTimeout(timerRef.current);

        const currentTarget = e.currentTarget;
        // 设置延迟显示定时器
        timerRef.current = setTimeout(() => {
            setAnchorEl(currentTarget);
        }, 200); // 200ms延迟显示, 防误触
    };

    // 鼠标离开时清除显示定时器并延迟关闭
    const handleMouseLeave = () => {
        // 清除显示定时器
        if (timerRef.current) clearTimeout(timerRef.current);

        // 设置关闭定时器
        timerRef.current = setTimeout(() => {
            setAnchorEl(null);
        }, 200); // 200ms延迟关闭, 防误触
    };

    return (
        <Box m={1} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <CardActionArea sx={{ borderRadius: '50%', zIndex: 1301, transition: '.4s', transform: anchorEl ? 'translate(0,20px) scale(1.25)' : undefined }}>
                <Avatar src="http://resource.whitecc.top/prod-api/file/avatar/149f4158-48e2-4759-b077-3c857dcfd3a5.jpg" alt="white" />
            </CardActionArea>
            <Popover
                disableScrollLock
                sx={{
                    pointerEvents: 'none', // 防止Popover拦截鼠标事件 -> 实现鼠标在popover的内容以外的元素(主要是遮罩层)里会触发外层盒子的onMouseLeave事件
                    '& .MuiPopover-paper': {
                        maxHeight: 'none',
                        pointerEvents: 'auto', // 允许Popover内容接收鼠标事件 -> 实现鼠标在popover的内容里不会触发外层盒子的onMouseLeave事件
                    },
                }}
                disablePortal
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
                <Box minWidth={250} pt={4}>
                    <Box textAlign="center">
                        <Typography variant="subtitle1">朽兮</Typography>
                    </Box>
                    <Stack direction="row" justifyContent="center">
                        {[1, 2, 3].map(item => (
                            <Stack key={item} direction="column" alignItems="center" p={2}>
                                <Typography variant="subtitle1" fontWeight={800}>
                                    {item}
                                </Typography>
                                <Typography variant="body1">获赞</Typography>
                            </Stack>
                        ))}
                    </Stack>
                    <Divider />

                    <List>
                        <ListItem sx={{ ...ListItemSx }}>
                            <ListItemButton sx={{ ...ListButtonItemSx }}>
                                <ListItemIcon>
                                    <PersonTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText primary="个人中心" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem sx={{ ...ListItemSx }}>
                            <ListItemButton sx={{ ...ListButtonItemSx }}>
                                <ListItemIcon>
                                    <StarTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText primary="我的收藏" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem sx={{ ...ListItemSx }}>
                            <ListItemButton sx={{ ...ListButtonItemSx }}>
                                <ListItemIcon>
                                    <DoorFrontTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText primary="退出" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Popover>
        </Box>
    );
};
export default LoginUser;
