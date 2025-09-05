import { IconButton, CardMedia, Stack, Typography, type IconButtonProps } from '@mui/material';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { useState } from 'react';
import { useNumeral } from '@/utils/hooks';

const OperationButton = ({ icon, color = 'primary' }: { icon: React.ReactElement; color?: IconButtonProps['color'] }) => {
    const [number, setNumber] = useState<number>(100);
    const [active, setActive] = useState<boolean>(false);
    const [hover, setHover] = useState<boolean>(false);

    const handleClick = () => {
        setActive(status => !status);
        setNumber(number => number + (active ? -1 : 1));
    };

    return (
        <Stack
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{
                cursor: 'pointer',
                color: active || hover ? `${color}.main` : 'text.secondary',
                '&:hover': {
                    '& .MuiIconButton-root': { bgcolor: 'var(--IconButton-hoverBg)' },
                },
            }}
            onClick={handleClick}
        >
            <IconButton
                color={active || hover ? color : undefined}
                sx={{ position: 'absolute', borderRadius: '50%', '& .MuiSvgIcon-root': { fontSize: '1.25rem' } }}
            >
                {icon}
            </IconButton>
            <Typography variant="body2" p={1} pl={4}>
                {number}
            </Typography>
        </Stack>
    );
};

const ArticleItem = ({ data }: { data: any }) => {
    const numeral = useNumeral();

    console.log(numeral(100000000).format());

    return (
        <Stack direction="row" spacing={3}>
            <CardMedia sx={{ borderRadius: 4, width: 240, height: 120 }} component="img" src={'https://v5.mui.com/static/images/cards/paella.jpg'} alt={''} />
            <Stack direction="column">
                <Typography className="text-ellipsis-1" variant="subtitle1" fontWeight={500} gutterBottom>
                    可以在命令行通过大模型使用上下文协议（MCP）与外部工具交互的软件：小巧的MCPHost
                </Typography>
                <Typography className="text-ellipsis-2" variant="body2" color="textSecondary" gutterBottom>
                    这是一次很好的实践。MCPHost小巧实用，可以很方便的架起大模型和MCP之间的桥梁。但是效果，尚需努力，使用deepseek-v3模型，离可以用，还有些距离。
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <OperationButton icon={<ThumbUpTwoToneIcon />} color="error" />
                    <OperationButton icon={<VisibilityTwoToneIcon />} />
                    <OperationButton icon={<BookmarkTwoToneIcon />} />
                </Stack>
            </Stack>
        </Stack>
    );
};

export default ArticleItem;
