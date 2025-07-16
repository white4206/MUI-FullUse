import { CardActionArea, IconButton, InputAdornment, Paper, Stack, Tooltip, Typography } from '@mui/material';
import SvgIcon from '@/components/SvgIcon';
import { useTranslation } from 'react-i18next';
import AppsIcon from '@mui/icons-material/Apps';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import ClearIcon from '@mui/icons-material/Clear';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import ImageSearchTwoToneIcon from '@mui/icons-material/ImageSearchTwoTone';
import { useEffect, useRef, useState } from 'react';
import { CustomTextField } from '@/components/FUTextField';

interface IconSelectProps {
    iconAreaHeight?: number | string;
    onIconSelect: (icon: string) => void;
}

const IconSelect = ({ iconAreaHeight = 300, onIconSelect }: IconSelectProps) => {
    const { t } = useTranslation();
    const [search, setSearch] = useState<string>('');
    const [isSearch, setIsSearch] = useState<boolean>(true);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [iconList, setIconList] = useState<string[]>([]);
    const [select, setSelect] = useState<string>('');
    const inputRef = useRef<HTMLElement>(null);

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
        setSelect(icon);
        setIsSearch(false);
        setIsFocused(false);
        onIconSelect(icon);
    };

    // 清空输入
    const handleClear = () => {
        setSearch('');
        setIsFocused(false);
        setIconList(requireIcons());
    };

    // 初始加载所有icon
    useEffect(() => {
        setIconList(requireIcons());
    }, []);

    return (
        <>
            <Stack direction="row" justifyContent="center" alignItems="center" mt={1} mb={1}>
                <Typography flexShrink={0} variant="subtitle1">
                    {t('components.iconSelect.title')}
                </Typography>
                <Tooltip title={t(`components.iconSelect.${isSearch ? 'fold' : 'search'}`)} placement="right">
                    <IconButton
                        sx={{ ml: 0.5, mr: 0.5 }}
                        onClick={() => {
                            setIsSearch(isSearch => !isSearch);
                            setIsFocused(isFocused => (isFocused ? false : isFocused));
                        }}
                    >
                        {select ? (
                            <SvgIcon iconName={select} />
                        ) : isSearch ? (
                            <ImageSearchTwoToneIcon sx={{ fontSize: '1rem', color: isSearch ? 'primary.main' : undefined }} />
                        ) : (
                            <ImageSearchIcon sx={{ fontSize: '1rem' }} />
                        )}
                    </IconButton>
                </Tooltip>
                <CustomTextField
                    inputRef={inputRef}
                    size="small"
                    sx={{
                        width: isSearch ? '100%' : 0,
                        transition: '.8s',
                        '& .MuiInputBase-root': { p: isSearch ? undefined : 0 },
                        '& fieldset': { display: isSearch ? undefined : 'none' },
                    }}
                    value={search}
                    placeholder={t('components.iconSelect.placeholder')}
                    fullWidth
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AppsIcon sx={{ width: isSearch ? 'auto' : 0, transition: '.4s' }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <>
                                    {search && (
                                        <IconButton size="small" onClick={handleClear}>
                                            <ClearIcon sx={{ width: isSearch ? 'auto' : 0, transition: '.4s' }} />
                                        </IconButton>
                                    )}
                                    <InputAdornment position="end">
                                        {iconList.length ? (
                                            <SearchIcon sx={{ width: isSearch ? 'auto' : 0, transition: '.4s' }} />
                                        ) : (
                                            <SearchOffIcon sx={{ width: isSearch ? 'auto' : 0, transition: '.4s' }} />
                                        )}
                                    </InputAdornment>
                                </>
                            ),
                        },
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleFilterIcons(e)}
                    onFocus={() => setIsFocused(true)}
                />
            </Stack>
            <Paper
                variant="outlined"
                sx={{
                    mb: isFocused ? 1 : 0,
                    maxHeight: isFocused ? iconAreaHeight : 0,
                    borderStyle: 'dashed',
                    borderWidth: isFocused ? 2 : 0,
                    borderColor: isFocused ? undefined : 'transparent',
                    borderRadius: 2,
                    p: 2,
                    pt: isFocused ? 2 : 0,
                    pb: isFocused ? 2 : 0,
                    transition: 'margin .4s, padding .4s, max-height .4s, border-color .4s',
                    position: 'relative',
                    overflowY: 'auto',
                    '::-webkit-scrollbar': { width: 0 },
                }}
            >
                <Stack direction="row" flexWrap="wrap" gap={1}>
                    {iconList.map(icon => (
                        <CardActionArea sx={{ borderRadius: 2, width: 'auto' }} key={icon}>
                            <Stack
                                p={1}
                                spacing={1}
                                direction="row"
                                justifyContent="start"
                                alignItems="center"
                                borderRadius={2}
                                sx={{
                                    cursor: 'pointer',
                                    transition: '.4s',
                                    bgcolor: 'bgColor',
                                }}
                                onClick={() => handleSelectIcon(icon)}
                            >
                                <SvgIcon iconName={icon} size="24px" />
                                <Typography variant="body2" overflow="hidden" textOverflow="ellipsis">
                                    {icon}
                                </Typography>
                            </Stack>
                        </CardActionArea>
                    ))}
                </Stack>
            </Paper>
        </>
    );
};

export default IconSelect;
