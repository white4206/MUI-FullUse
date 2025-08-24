import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    Paper,
    Skeleton,
    Stack,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useBreakpoint } from '@/utils/hook';
import HandymanIcon from '@mui/icons-material/Handyman';
import { useTranslation } from 'react-i18next';
import SvgIcon from '@/components/SvgIcon';
import { useEffect, useState } from 'react';
import { getCarousel } from '@/api/common';
import { mapUrl } from '@/utils/url';
import { getHeadArticle } from '@/api/article';
import React from 'react';

const ToolBoxItem = () => {
    const theme = useTheme();

    return (
        <CardActionArea sx={{ borderRadius: 2, flex: '0 0 25%' }}>
            <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
                borderRadius={2}
                p={1}
                sx={{ transition: '.4s', cursor: 'pointer', '&:hover': { bgcolor: theme.palette.action.hover } }}
            >
                <SvgIcon iconName="logo" size="32px" />
                <Typography variant="body2">工具</Typography>
            </Stack>
        </CardActionArea>
    );
};

const Home = () => {
    const theme = useTheme();
    const { xl, lg, md, sm } = useBreakpoint();
    const { t } = useTranslation();
    const [isSwiperDataLoading, setIsSwiperDataLoading] = useState<boolean>(true);
    const [swiperData, setSwiperData] = useState<Carousel[]>([]);
    const [isHeadArticleLoading, setIsHeadArticleLoading] = useState<boolean>(true);
    const [headArticleData, setHeadArticleData] = useState<HeadArticle | null>(null);
    const [isToolOptionLoading, setIsToolOptionLoading] = useState<boolean>(true);

    useEffect(() => {
        // * 获取轮播图数据
        const getCarouselData = async () => {
            const res = await getCarousel();
            setSwiperData(
                res.data.map(carousel => {
                    return { ...carousel, image: mapUrl(carousel.image) };
                })
            );
            setIsSwiperDataLoading(false);
        };
        void getCarouselData();
        // * 获取头文章
        const getHeadArticleData = async () => {
            const res = await getHeadArticle();
            setHeadArticleData({
                ...res.data,
                cover: mapUrl(res.data.cover),
            });
            setIsHeadArticleLoading(false);
        };
        void getHeadArticleData();
    }, []);

    return (
        <Box bgcolor={theme.palette.bgColor}>
            <Container maxWidth="xl" sx={{ p: 2, pl: { xl: 10, lg: 10 }, pr: { xl: 10, lg: 10 } }}>
                <Grid justifyContent="center" container spacing={xl ? 8 : lg ? 6 : 0}>
                    <Grid size={{ xs: 12, sm: 11, md: 10, lg: 8, xl: 8 }} sx={{ position: 'relative' }}>
                        {isSwiperDataLoading ? (
                            <>
                                <Skeleton sx={{ borderRadius: 4 }} variant="rounded" height={xl ? 500 : lg ? 450 : md ? 400 : sm ? 300 : 200} />
                                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                                    <CircularProgress color="primary" />
                                </Box>
                            </>
                        ) : (
                            <Swiper
                                style={{ borderRadius: 16 }}
                                modules={[Pagination]}
                                pagination={{ clickable: true, dynamicBullets: true }}
                                autoplay={{ pauseOnMouseEnter: true }}
                                loop
                            >
                                {swiperData.map(swiper => {
                                    return (
                                        <SwiperSlide key={swiper.id}>
                                            <CardMedia
                                                height={xl ? 500 : lg ? 450 : md ? 400 : sm ? 300 : 200}
                                                component="img"
                                                image={swiper.image || undefined}
                                            />
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        )}
                    </Grid>
                    <Grid display={{ xs: 'none', lg: 'block' }} size={{ xs: 0, sm: 0, md: 0, lg: 4, xl: 4 }}>
                        <Stack height="100%" direction="column" justifyContent="space-between">
                            <Card sx={{ borderRadius: 4 }} elevation={3}>
                                {isHeadArticleLoading ? (
                                    <>
                                        <Skeleton height={xl ? 180 : 130} sx={{ borderRadius: 4 }} variant="rounded" />
                                        <CardContent>
                                            <Skeleton height={16} sx={{ mb: 1, width: '70%' }} variant="rounded" />
                                            <Skeleton height={16} sx={{ mb: 1 }} variant="rounded" />
                                        </CardContent>
                                    </>
                                ) : (
                                    <CardActionArea>
                                        <CardMedia sx={{ height: { xl: 180, lg: 130 }, borderRadius: 4 }} image={headArticleData?.cover || undefined} />
                                        <CardContent>
                                            <Typography className="text-ellipsis-2" gutterBottom variant="subtitle1" fontWeight={500}>
                                                {headArticleData?.title}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }} className="text-ellipsis-2">
                                                {headArticleData?.abstractText}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                )}
                            </Card>
                            <Card sx={{ borderRadius: 4 }} elevation={3}>
                                <CardContent sx={{ p: '0 !important', bgcolor: theme.palette.toolboxBgColor }}>
                                    <Stack direction="row" alignItems="center" p={2} pb={1}>
                                        <Typography fontWeight={600} variant="h6">
                                            工具箱
                                        </Typography>
                                        <Tooltip title={t('toolbox.edit')} placement="right">
                                            <IconButton sx={{ borderRadius: 2, ml: 1, transition: '.4s', '&:hover': { transform: 'rotate(15deg)' } }}>
                                                <HandymanIcon sx={{ fontSize: 14, color: theme.palette.fullUseMain.main }} />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                    <Paper sx={{ borderRadius: 4 }} elevation={3}>
                                        {isToolOptionLoading ? (
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
                                            <Stack direction="row" p={1} sx={{ overflowX: 'auto' }}>
                                                {[1, 2, 3, 4, 5, 6, 7, 8].map(item => {
                                                    return <ToolBoxItem key={item} />;
                                                })}
                                            </Stack>
                                        )}
                                    </Paper>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Home;
