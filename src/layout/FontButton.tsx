import useFont from '@/font';
import { IconButton, Menu, MenuItem, Box, Typography, Tooltip, type TypographyProps } from '@mui/material';
import { useState } from 'react';
import FontDownloadTwoToneIcon from '@mui/icons-material/FontDownloadTwoTone';
import { useTranslation } from 'react-i18next';

const FontTypographyList = ({ font }: { font: string }) => {
    const { fontTypographyList } = useFont();
    return (
        <>
            {fontTypographyList.map(typography => (
                <Typography
                    key={typography.id}
                    sx={{ fontFamily: `${font} !important`, ...typography.sx }}
                    variant={typography.variant as TypographyProps['variant']}
                    gutterBottom
                >
                    {typography.content}
                </Typography>
            ))}
        </>
    );
};

const FontButton = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
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
            <Tooltip title={t('navBar.font')}>
                <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
                    <FontDownloadTwoToneIcon />
                </IconButton>
            </Tooltip>
            <Menu id="font-menu" anchorEl={anchorEl} open={fontOpen} onClose={() => setAnchorEl(null)}>
                {fonts.map(font => (
                    <MenuItem key={font.id} onClick={() => handleChangeFont(font.font)} sx={{ whiteSpace: 'inherit' }}>
                        <Box width="100%" maxWidth={520}>
                            <Typography sx={{ fontFamily: `${font.font} !important`, color: 'teal' }} variant="h3" gutterBottom>
                                {font.name}
                            </Typography>
                            <FontTypographyList font={font.font} />
                        </Box>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};
export { FontTypographyList, FontButton };
