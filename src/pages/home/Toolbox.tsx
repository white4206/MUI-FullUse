import IconSelect from '@/components/IconSelect';
import { openUrl } from '@/utils/url';
import {
    type SxProps,
    Box,
    CardActionArea,
    Stack,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    Card,
    CardContent,
    DialogActions,
    Button,
    Tooltip,
    IconButton,
    Paper,
    Skeleton,
    useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SvgIcon from '@/components/SvgIcon';
import { getToolOption } from '@/api/common';
import HardwareIcon from '@mui/icons-material/Hardware';
import AddIcon from '@mui/icons-material/Add';
import FuTextField from '@/components/FUTextField';
import { DndContext, type DragEndEvent, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// 新建工具项
const NewToolOption = ({ onNewToolOption }: { onNewToolOption?: () => void }) => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Box flex="0 0 25%" p={0.5}>
            <Tooltip title={t('pages.home.toolbox.edit.new')} placement="bottom">
                <CardActionArea
                    sx={{ height: '100%', borderRadius: 2, border: `2px dashed ${theme.palette.buttonBorderColor}` }}
                    onClick={() => onNewToolOption && onNewToolOption()}
                >
                    <Stack
                        height="100%"
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius={2}
                        p={1}
                        sx={{ transition: '.4s', cursor: 'pointer', '&:hover': { bgcolor: theme.palette.action.hover } }}
                    >
                        <AddIcon sx={{ height: '32px', width: '32px', color: theme.palette.text.secondary }} />
                    </Stack>
                </CardActionArea>
            </Tooltip>
        </Box>
    );
};

const ToolboxItem = ({ sx, editMode, data }: { sx?: SxProps; editMode: boolean; data: ToolOption }) => {
    const theme = useTheme();
    // 使用 useSortable 钩子使项目可拖拽
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: data.id, disabled: !editMode });

    // 应用拖拽样式
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 1000 : 'auto',
        opacity: isDragging ? 0.7 : 1,
    };
    return (
        <Box flex="0 0 25%" p={0.5} minWidth={0} sx={sx} className="toolbox-item" ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <CardActionArea
                sx={{
                    borderRadius: 2,
                    cursor: editMode ? 'grab' : 'pointer',
                    '&:active': {
                        cursor: editMode ? 'grabbing' : 'pointer',
                    },
                }}
                onClick={() => !editMode && openUrl(data.path)}
            >
                <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={2}
                    p={1}
                    sx={{
                        transition: '.4s',
                        bgcolor: isDragging ? theme.palette.action.selected : 'inherit',
                        '&:hover': { bgcolor: theme.palette.action.hover },
                    }}
                >
                    {/* 拖拽手柄图标 - 仅在编辑模式下显示 */}
                    {editMode && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 4,
                                right: 4,
                                opacity: 0.5,
                                '&:hover': { opacity: 1 },
                            }}
                        >
                            <SvgIcon iconName="dragHandle" size="1rem" />
                        </Box>
                    )}
                    <SvgIcon iconName={data.icon} size="32px" />
                    <Typography noWrap variant="body2">
                        {data.name}
                    </Typography>
                </Stack>
            </CardActionArea>
        </Box>
    );
};

const ToolBoxEditDialog = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
    const { t } = useTranslation();

    return (
        <Dialog maxWidth="xs" sx={{ '& .MuiDialog-paper': { borderRadius: 4 } }} open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{t('pages.home.toolbox.edit.new')}</DialogTitle>
            <DialogContent>
                <IconSelect onIconSelect={icon => console.log(icon)} />
                <FuTextField sx={{ mb: 1 }} labelPosition="top" label="名称" fullWidth />
                <FuTextField sx={{ mb: 1 }} labelPosition="top" label="路径" fullWidth />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>{t('pages.home.toolbox.edit.cancel')}</Button>
                <Button>{t('pages.home.toolbox.edit.confirm')}</Button>
            </DialogActions>
        </Dialog>
    );
};

const Toolbox = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [toolOptionData, setToolOptionData] = useState<ToolOption[]>([]);
    const [newToolOptionOpen, setNewToolOptionOpen] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
    const [canScrollRight, setCanScrollRight] = useState<boolean>(false);
    const [itemWidth, setItemWidth] = useState(0); // 存储单个项目的宽度

    // 配置传感器
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // 需要移动8px才开始拖拽，防止误触
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // 处理拖拽结束事件
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = toolOptionData.findIndex(tool => tool.id === active.id);
            const newIndex = toolOptionData.findIndex(tool => tool.id === over.id);

            const newTools = arrayMove(toolOptionData, oldIndex, newIndex);
            setToolOptionData(newTools);
        }
    };

    const toggleScroll = (left: number) => {
        if (scrollContainer) scrollContainer.scrollBy({ left: left, behavior: 'smooth' });
    };

    useEffect(() => {
        // * 获取工具项
        const getToolOptionData = async () => {
            const res = await getToolOption();
            setToolOptionData(res.data);
            setIsLoading(false);
        };
        void getToolOptionData();
    }, []);

    useEffect(() => {
        console.log(scrollContainer);
        if (!scrollContainer) return;
        const checkScroll = () => {
            if (!scrollContainer) return;
            setCanScrollLeft(scrollContainer.scrollLeft > 0);
            setCanScrollRight(scrollContainer.scrollLeft + scrollContainer.clientWidth < scrollContainer.scrollWidth);
        };
        // 初始检查
        checkScroll();
        // 监听滚动事件
        scrollContainer.addEventListener('scroll', checkScroll);
        return () => {
            scrollContainer.removeEventListener('scroll', checkScroll);
        };
    }, [scrollContainer]); // 依赖scrollContainer

    // 数据加载后手动检查滚动状态
    useEffect(() => {
        if (!isLoading) {
            // 下一帧检查确保DOM更新完成
            requestAnimationFrame(() => {
                if (scrollContainer) {
                    setCanScrollLeft(scrollContainer.scrollLeft > 0);
                    setCanScrollRight(scrollContainer.scrollLeft + scrollContainer.clientWidth < scrollContainer.scrollWidth);
                }
            });
        }
    }, [isLoading, toolOptionData, editMode, scrollContainer]); // 编辑模式变化时也触发

    // 获取单个项目的宽度 (包括间距)
    useEffect(() => {
        if (!scrollContainer) return;

        // 获取第一个 ToolBoxItem 元素
        const firstItem = scrollContainer.querySelector('.toolbox-item');

        if (firstItem) {
            // 计算元素宽度 + 左右边距
            const itemStyle = window.getComputedStyle(firstItem);
            const width = firstItem.clientWidth;
            const marginLeft = parseFloat(itemStyle.marginLeft);
            const marginRight = parseFloat(itemStyle.marginRight);
            setItemWidth(width + marginLeft + marginRight);
        }
    }, [scrollContainer, toolOptionData, editMode]); // 依赖项

    return (
        <Card sx={{ borderRadius: 4 }} elevation={3}>
            <CardContent sx={{ p: '0 !important', bgcolor: theme.palette.toolboxBgColor }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" p={2} pb={1}>
                    <Stack direction="row" alignItems="center">
                        <Typography fontWeight={600} variant="h6">
                            {t('pages.home.toolbox.title')}
                        </Typography>
                        <Tooltip title={t(`pages.home.toolbox.edit.${editMode ? 'exit' : 'title'}`)} placement="right">
                            <IconButton
                                onClick={() => setEditMode(editMode => !editMode)}
                                sx={{ borderRadius: 2, ml: 1, transition: '.4s', transform: editMode ? 'rotate(15deg)' : undefined }}
                            >
                                <HardwareIcon sx={{ fontSize: '1rem', color: editMode ? theme.palette.fullUseMain.main : undefined }} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    {scrollContainer && scrollContainer.clientWidth < scrollContainer.scrollWidth && (
                        <Stack direction="row" alignItems="center" borderRadius={4} bgcolor={theme.palette.navBarButtonBgColor}>
                            <IconButton
                                disabled={!canScrollLeft}
                                onClick={() => toggleScroll(-itemWidth)}
                                sx={{ borderRadius: 4, height: '1.5rem', width: '1.5rem' }}
                            >
                                <KeyboardArrowLeftIcon
                                    sx={{ fontSize: '1.25rem', color: canScrollLeft ? theme.palette.primary.main : theme.palette.text.disabled }}
                                />
                            </IconButton>
                            <IconButton
                                disabled={!canScrollRight}
                                onClick={() => toggleScroll(itemWidth)}
                                sx={{ borderRadius: 4, height: '1.5rem', width: '1.5rem' }}
                            >
                                <KeyboardArrowRightIcon
                                    sx={{ fontSize: '1.25rem', color: canScrollRight ? theme.palette.primary.main : theme.palette.text.disabled }}
                                />
                            </IconButton>
                        </Stack>
                    )}
                </Stack>
                {/* 新建工具项Dialog */}
                <ToolBoxEditDialog open={newToolOptionOpen} setOpen={setNewToolOptionOpen} />
                <Paper sx={{ borderRadius: 4 }} elevation={3}>
                    {isLoading ? (
                        <Stack direction="row" justifyContent="space-around" p={1}>
                            {[1, 2, 3, 4].map(item => {
                                return (
                                    <React.Fragment key={item}>
                                        <Stack direction="column" alignItems="center" spacing={1} p={1} m={1}>
                                            <Skeleton height={32} width={32} sx={{ borderRadius: 2 }} variant="rounded" />
                                            <Skeleton height={12} width={32} variant="rounded" />
                                        </Stack>
                                    </React.Fragment>
                                );
                            })}
                        </Stack>
                    ) : (
                        <Stack direction="row" p={1} ref={setScrollContainer} sx={{ overflowX: 'auto', '::-webkit-scrollbar': { height: 0 } }}>
                            {editMode && <NewToolOption onNewToolOption={() => setNewToolOptionOpen(true)} />}
                            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                <SortableContext items={toolOptionData.map(tool => tool.id)}>
                                    {toolOptionData.map(item => {
                                        return (
                                            <ToolboxItem
                                                key={item.id}
                                                data={item}
                                                editMode={editMode}
                                                sx={{
                                                    '& .MuiButtonBase-root': {
                                                        border: '2px dashed',
                                                        borderColor: editMode ? theme.palette.buttonBorderColor : 'transparent',
                                                        animation: editMode ? 'shake 0.4s ease infinite' : undefined,
                                                    },
                                                    '& :hover': {
                                                        animation: 'none',
                                                    },
                                                }}
                                            />
                                        );
                                    })}
                                </SortableContext>
                            </DndContext>
                        </Stack>
                    )}
                </Paper>
            </CardContent>
        </Card>
    );
};
export default Toolbox;
