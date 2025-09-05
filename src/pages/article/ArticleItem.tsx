import { IconButton, CardMedia, Stack, Typography, type IconButtonProps, CardActionArea } from '@mui/material';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { useState } from 'react';
import { useNumeral } from '@/hooks';
import FULink from '@/components/FULink';
import useDayjs from '@/hooks/useDayjs';

const OperationButton = ({ color = 'primary', ...rest }: { color?: IconButtonProps['color']; icon: React.ElementType }) => {
    const [number, setNumber] = useState<number>(100000);
    const [active, setActive] = useState<boolean>(false);
    const [hover, setHover] = useState<boolean>(false);
    const { numberFormat } = useNumeral();

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
            <IconButton color={active || hover ? color : undefined} sx={{ position: 'absolute', borderRadius: '50%' }}>
                <rest.icon fontSize="small" />
            </IconButton>
            <Typography variant="body2" p={1} pl={4}>
                {numberFormat(number)}
            </Typography>
        </Stack>
    );
};

const ArticleItem = ({ data }: { data: any }) => {
    const [isHover, setIsHover] = useState(false);
    const { dateFormat } = useDayjs();

    return (
        <Stack
            direction="row"
            spacing={3}
            borderRadius={4}
            p={1.5}
            pl={1}
            pr={1}
            mb={1.5}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            bgcolor={isHover ? 'action.hover' : undefined}
            sx={{ transition: '.4s', '&:last-of-type': { mb: 0 } }}
        >
            <CardActionArea component={FULink} to="/article" target="_blank" sx={{ width: 210, flexShrink: 0 }}>
                <CardMedia component="img" height={120} sx={{ borderRadius: 4 }} image={'https://v5.mui.com/static/images/cards/paella.jpg'} alt={''} />
            </CardActionArea>
            <Stack direction="column">
                <FULink
                    className="text-ellipsis-1"
                    color="textPrimary"
                    hoverColor="primary"
                    to="/article"
                    target="_blank"
                    underline="none"
                    variant="subtitle1"
                    fontWeight={500}
                    gutterBottom
                >
                    可以在命令行通过大模型使用上下文协议（MCP）与外部工具交互的软件：小巧的MCPHost
                </FULink>
                <FULink className="text-ellipsis-2" variant="body2" color="textSecondary" to="/article" target="_blank" underline="none" gutterBottom>
                    这是一次很好的实践。MCPHost小巧实用，可以很方便的架起大模型和MCP之间的桥梁。但是效果，尚需努力，使用deepseek-v3模型，离可以用，还有些距离。
                </FULink>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <OperationButton icon={ThumbUpTwoToneIcon} color="error" />
                        <OperationButton icon={VisibilityTwoToneIcon} />
                        <OperationButton icon={BookmarkTwoToneIcon} />
                    </Stack>
                    <Typography variant="caption" color="textSecondary">
                        {dateFormat('2025/08/24 12:12:00')}
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default ArticleItem;
