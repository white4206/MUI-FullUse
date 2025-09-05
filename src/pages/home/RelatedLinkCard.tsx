import { SideCard, SvgIcon } from '@/components';
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    CardMedia,
    IconButton,
    Stack,
    Breadcrumbs,
    Avatar,
    Skeleton,
    Tooltip,
    ListItem,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LinkIcon from '@mui/icons-material/Link';
import { useTranslation } from 'react-i18next';
import { getRelatedLink } from '@/api/common';
import { mapUrl } from '@/utils/url';
import { defaultRelatedLinkIcon } from '@/utils/constant';
import CommitIcon from '@mui/icons-material/Commit';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import type { RelatedLink } from '@/api/types';
import FULink from '@/components/FULink';

const RelatedLinkCard = () => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [relatedLinkData, setRelatedLinkData] = useState<(RelatedLink & { hasSub: boolean; open: boolean })[]>([]);

    const handleClick = (openIndex: number) => {
        setRelatedLinkData(linkData => linkData.map((item, index) => (openIndex === index ? { ...item, open: !item.open } : item)));
    };

    const handleExpandAll = () => {
        setRelatedLinkData(linkData => linkData.map(item => ({ ...item, open: !item.open })));
    };

    useEffect(() => {
        // *Axios 获取相关链接数据
        const getRelatedLinkData = async () => {
            const res = await getRelatedLink();
            setIsLoading(false);
            setRelatedLinkData(
                res.data.map(link => ({
                    ...link,
                    icon: mapUrl(link.icon) || defaultRelatedLinkIcon,
                    subLinks: link.id === 1 ? [res.data[0]] : [],
                    hasSub: link.id === 1,
                    open: false,
                }))
            );
        };
        void getRelatedLinkData();
    }, []);

    return (
        <SideCard
            title={
                <Stack direction="row" alignItems="center">
                    {t('pages.home.relatedLinkCard.title')}
                    <Tooltip title={t('pages.home.relatedLinkCard.expand')} placement="right">
                        <IconButton sx={{ ml: 0.5 }} onClick={handleExpandAll}>
                            <AttachFileIcon sx={{ fontSize: '1rem', transform: 'rotate(45deg)' }} />
                        </IconButton>
                    </Tooltip>
                </Stack>
            }
        >
            <List>
                {isLoading ? (
                    <>
                        {[1, 2, 3, 4].map(item => (
                            <Skeleton key={item} height={42} sx={{ borderRadius: 4, mt: 1 }} variant="rounded" />
                        ))}
                    </>
                ) : (
                    relatedLinkData.map((link, index) => (
                        <React.Fragment key={link.id}>
                            <ListItem disablePadding>
                                <ListItemButton
                                    {...(!link.hasSub ? { component: FULink, to: link.url, target: '_blank' } : {})}
                                    onClick={() => link.hasSub && handleClick(index)}
                                    sx={{ borderRadius: 4 }}
                                >
                                    <ListItemIcon sx={{ minWidth: 0, width: 24, mr: 2 }}>
                                        <CardMedia component="img" height={24} image={link.icon} alt={link.title} />
                                    </ListItemIcon>
                                    <ListItemText primary={link.title} />
                                    {
                                        //有子链接的显示展开图标
                                        link.subLinks && link.subLinks.length > 0 ? (
                                            link.open ? (
                                                <ExpandLessIcon color="primary" />
                                            ) : (
                                                <ExpandMoreIcon color="action" />
                                            )
                                        ) : link.sideIcon ? (
                                            // 无子链接设置侧边图标的显示侧边图标
                                            <SvgIcon iconName={link.sideIcon} />
                                        ) : (
                                            // 否则显示默认链接图标
                                            <LinkIcon color="primary" />
                                        )
                                    }
                                </ListItemButton>
                            </ListItem>
                            <Collapse in={link.open} timeout="auto" unmountOnExit>
                                <List sx={{ p: 0 }}>
                                    <ListItem disablePadding>
                                        {link.subLinks?.map(subLink => (
                                            <ListItemButton key={subLink.id} sx={{ ml: 4, borderRadius: 4 }}>
                                                <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
                                                    <Avatar
                                                        component={FULink}
                                                        to="/article"
                                                        sx={{ width: 24, height: 24 }}
                                                        src="http://resource.whitecc.top/prod-api/file/avatar/149f4158-48e2-4759-b077-3c857dcfd3a5.jpg"
                                                        alt="white4206"
                                                    />
                                                </ListItemIcon>
                                                <ListItemText>
                                                    <Breadcrumbs aria-label="breadcrumb">
                                                        <FULink
                                                            underline="hover"
                                                            fontSize={14}
                                                            color="textSecondary"
                                                            to="https://github.com/white4206"
                                                            target="_blank"
                                                        >
                                                            white4206
                                                        </FULink>
                                                        <FULink
                                                            underline="hover"
                                                            fontSize={14}
                                                            color="textPrimary"
                                                            to="https://github.com/white4206/MUI-FullUse"
                                                            target="_blank"
                                                        >
                                                            MUI-FullUse
                                                        </FULink>
                                                    </Breadcrumbs>
                                                </ListItemText>
                                                {subLink.sideIcon ? <SvgIcon iconName={subLink.sideIcon} /> : <CommitIcon color="primary" />}
                                            </ListItemButton>
                                        ))}
                                    </ListItem>
                                </List>
                            </Collapse>
                        </React.Fragment>
                    ))
                )}
            </List>
        </SideCard>
    );
};
export default RelatedLinkCard;
