import useFont from '@/font';
import { IconButton, Menu, MenuItem, Box, Typography } from '@mui/material';
import { useState } from 'react';
import FontDownloadIcon from '@mui/icons-material/FontDownload';

const FontButton = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const fontOpen = Boolean(anchorEl);
    const { fonts, fontTypographyList, changeFont } = useFont();
    // 字体切换
    const handleChangeFont = (font: string) => {
        changeFont(font);
        setAnchorEl(null);
    };
    return (
        <>
            <IconButton sx={{ m: 0.5, borderRadius: 2 }} onClick={e => setAnchorEl(e.currentTarget)}>
                <FontDownloadIcon />
            </IconButton>
            <Menu id="font-menu" anchorEl={anchorEl} open={fontOpen} onClose={() => setAnchorEl(null)}>
                {fonts.map(font => {
                    return (
                        <MenuItem key={font.id} onClick={() => handleChangeFont(font.font)} sx={{ whiteSpace: 'inherit' }}>
                            <Box sx={{ width: '100%', maxWidth: 520 }}>
                                <Typography sx={{ fontFamily: `${font.font} !important`, color: 'teal' }} variant="h3" gutterBottom>
                                    {font.name}
                                </Typography>
                                {fontTypographyList.map(typography => {
                                    return (
                                        <Typography
                                            key={typography.id}
                                            sx={{ fontFamily: `${font.font} !important`, ...typography.sx }}
                                            variant={typography.variant as import('@mui/material').TypographyProps['variant']}
                                            gutterBottom
                                        >
                                            {typography.content}
                                        </Typography>
                                    );
                                })}
                            </Box>
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
};
export default FontButton;
