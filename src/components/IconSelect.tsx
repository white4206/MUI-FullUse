import { Box, Card, CardContent, IconButton, InputAdornment, Paper, Stack, TextField, Typography, useTheme, type CardProps } from '@mui/material';
import SvgIcon from '@/components/SvgIcon';
import { useTranslation } from 'react-i18next';
import AppsIcon from '@mui/icons-material/Apps';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import ClearIcon from '@mui/icons-material/Clear';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import { useEffect, useState } from 'react';

type IconSelectProps = CardProps & {
    size?: number;
    onIconSelect: (icon: string) => void;
};

const defaultCardProps: CardProps = { elevation: 3 };
const defaultSxProps = { borderRadius: 2, width: 500 };

const IconSelect = ({ size = 64, onIconSelect, ...cardProps }: IconSelectProps) => {
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
        <Card {...defaultCardProps} {...cardProps} sx={{ ...defaultSxProps, ...(cardProps.sx || {}) }}>
            <CardContent>
                <Stack direction="row" justifyContent="center" alignItems="center">
                    <Typography textAlign="center" variant="h6">
                        {t('iconSelect.title')}
                    </Typography>
                    <ImageSearchIcon sx={{ fontSize: '1rem', color: theme.palette.fullUseMain.main, ml: 1 }} />
                </Stack>
                <Box mt={2} mb={2}>
                    <TextField
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
                <Paper variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
                    <Stack direction="row" flexWrap="wrap" justifyContent="center" alignItems="center">
                        {iconList.map(icon => {
                            return (
                                <Stack
                                    key={icon}
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    borderRadius={2}
                                    width={size}
                                    height={size}
                                    sx={{ cursor: 'pointer', transition: '.4s', '&:hover': { bgcolor: theme.palette.action.hover } }}
                                    onClick={() => handleSelectIcon(icon)}
                                >
                                    <SvgIcon iconName={icon} size="24px" />
                                    <Typography variant="body1">{icon}</Typography>
                                </Stack>
                            );
                        })}
                    </Stack>
                </Paper>
            </CardContent>
        </Card>
    );
};

export default IconSelect;
