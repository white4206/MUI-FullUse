import { Box, Card, CardContent, IconButton, InputAdornment, Paper, Stack, TextField, Tooltip, Typography, useTheme, type CardProps } from '@mui/material';
import SvgIcon from '@/components/SvgIcon';
import { useTranslation } from 'react-i18next';
import AppsIcon from '@mui/icons-material/Apps';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import ClearIcon from '@mui/icons-material/Clear';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import { useEffect, useState } from 'react';

type IconSelectProps = CardProps & {
    height?: number;
    width?: number;
    size?: number;
    onIconSelect: (icon: string) => void;
};

const IconSelect = ({ height = 500, width = 500, size = 128, onIconSelect, ...cardProps }: IconSelectProps) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const [search, setSearch] = useState<string>('');
    const [iconList, setIconList] = useState<string[]>([]);

    // 加载本地所有静态svg图标
    const requireIcons = () => {
        const icons = import.meta.glob('@/assets/icons/svg/*.svg');
        const iconList = [];
        for (const icon in icons) {
            const path = icon.split('assets/icons/svg/')[1].split('.svg')[0];
            iconList.push(path);
        }
        return iconList;
    };

    // 搜索图标
    const handleFilterIcons = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // 先赋给输入框值
        const value = e.target.value;
        setSearch(value);
        // 再根据输入过滤图标
        const icons = requireIcons();
        // 输入值去除空格、转为小写
        setIconList(icons.filter(item => item.indexOf(value.trim().toLocaleLowerCase()) !== -1));
    };

    // 选择图标
    const handleSelectIcon = (icon: string) => {
        onIconSelect(icon);
    };

    // 清空输入
    const handleClear = () => {
        setSearch('');
        setIconList(requireIcons());
    };

    // 初始加载所有icon
    useEffect(() => {
        setIconList(requireIcons());
    }, []);

    return (
        <Card elevation={3} {...cardProps} sx={{ borderRadius: 2, width: width, height: height, ...(cardProps.sx || {}) }}>
            <CardContent sx={{ height: '100%' }}>
                <Stack direction="column" height="100%">
                    <Stack direction="row" justifyContent="center" alignItems="center">
                        <Typography textAlign="center" variant="h6">
                            {t('iconSelect.title')}
                        </Typography>
                        <ImageSearchIcon sx={{ fontSize: '1rem', color: theme.palette.fullUseMain.main, ml: 1 }} />
                    </Stack>
                    <Box mt={2} mb={2}>
                        <TextField
                            sx={{ bgcolor: theme.palette.bgColor }}
                            value={search}
                            autoFocus
                            placeholder={t('iconSelect.placeholder')}
                            label={t('iconSelect.label')}
                            fullWidth
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AppsIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <>
                                            {search && (
                                                <IconButton onClick={handleClear}>
                                                    <ClearIcon />
                                                </IconButton>
                                            )}
                                            <InputAdornment position="end">{iconList.length ? <SearchIcon /> : <SearchOffIcon />}</InputAdornment>
                                        </>
                                    ),
                                },
                            }}
                            onChange={e => handleFilterIcons(e)}
                        />
                    </Box>
                    <Paper variant="outlined" sx={{ borderRadius: 2, p: 2, flex: 1, position: 'relative', overflowY: 'auto', bgcolor: theme.palette.bgColor }}>
                        <Box display="grid" gridTemplateColumns={`repeat(auto-fill, minmax(${size}px, 1fr))`} gap={1}>
                            {iconList.map(icon => {
                                return (
                                    <Stack
                                        p={1}
                                        spacing={1}
                                        key={icon}
                                        direction="row"
                                        justifyContent="start"
                                        alignItems="center"
                                        borderRadius={2}
                                        width={size}
                                        sx={{ cursor: 'pointer', transition: '.4s', '&:hover': { bgcolor: theme.palette.action.hover } }}
                                        onClick={() => handleSelectIcon(icon)}
                                    >
                                        <SvgIcon iconName={icon} size="24px" />
                                        <Tooltip title={icon} placement="right">
                                            <Typography variant="body1" overflow="hidden" textOverflow="ellipsis">
                                                {icon}
                                            </Typography>
                                        </Tooltip>
                                    </Stack>
                                );
                            })}
                        </Box>
                    </Paper>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default IconSelect;
