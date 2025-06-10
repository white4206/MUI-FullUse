import useFont from '@/font';
import { IconButton, Menu, MenuItem, Box, Typography, Tooltip } from '@mui/material';
import { useState } from 'react';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import { useTranslation } from 'react-i18next';

const FontTypographyList = ({ font }: { font: string }) => {
    const { fontTypographyList } = useFont();
    return (
        <>
            {fontTypographyList.map(typography => {
                return (
                    <Typography
                        key={typography.id}
                        sx={{ fontFamily: `${font} !important`, ...typography.sx }}
                        variant={typography.variant as import('@mui/material').TypographyProps['variant']}
                        gutterBottom
                    >
                        {typography.content}
                    </Typography>
                );
            })}
        </>
    );
};

const FontButton = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const fontOpen = Boolean(anchorEl);
    const { fonts, changeFont } = useFont();
    const { t } = useTranslation();

    // 字体切换
    const handleChangeFont = (font: string) => {
        changeFont(font);
        setAnchorEl(null);
    };
    return (
        <>
            <Tooltip title={t('navBar.font')} enterDelay={500}>
                <IconButton sx={{ borderRadius: 2 }} onClick={e => setAnchorEl(e.currentTarget)}>
                    <FontDownloadIcon />
                </IconButton>
            </Tooltip>
            <Menu id="font-menu" anchorEl={anchorEl} open={fontOpen} onClose={() => setAnchorEl(null)}>
                {fonts.map(font => {
                    return (
                        <MenuItem key={font.id} onClick={() => handleChangeFont(font.font)} sx={{ whiteSpace: 'inherit' }}>
                            <Box sx={{ width: '100%', maxWidth: 520 }}>
                                <Typography sx={{ fontFamily: `${font.font} !important`, color: 'teal' }} variant="h3" gutterBottom>
                                    {font.name}
                                </Typography>
                                <FontTypographyList font={font.font} />
                            </Box>
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
};
export { FontTypographyList, FontButton };
