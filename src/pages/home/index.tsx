import { Box, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Container, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useBreakpoint } from '@/utils/hooks';
import { useEffect, useState } from 'react';
import { getCarousel } from '@/api/common';
import { mapUrl } from '@/utils/url';
import { getHeadArticle } from '@/api/article';
import Toolbox from '@/pages/home/Toolbox';
import RelatedLinkCard from '@/pages/home/RelatedLinkCard';
import { defaultCarousel } from '@/utils/constant';

const Home = () => {
    const { xl, lg, md, sm } = useBreakpoint();
    const [isSwiperDataLoading, setIsSwiperDataLoading] = useState<boolean>(true);
    const [swiperData, setSwiperData] = useState<Carousel[]>([]);
    const [isHeadArticleLoading, setIsHeadArticleLoading] = useState<boolean>(true);
    const [headArticleData, setHeadArticleData] = useState<HeadArticle | null>(null);

    useEffect(() => {
        // * 获取轮播图数据
        const getCarouselData = async () => {
            const res = await getCarousel();
            setSwiperData(res.data.map(carousel => ({ ...carousel, image: mapUrl(carousel.image) || defaultCarousel })));
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
        <>
            <Box bgcolor="bgColor">
                <Container maxWidth="xl" sx={{ p: 2, pl: { xl: 10, lg: 10 }, pr: { xl: 10, lg: 10 } }}>
                    <Grid justifyContent="center" container spacing={xl ? 8 : lg ? 6 : 0}>
                        {/* 左侧轮播图 */}
                        <Grid size={{ xs: 12, sm: 11, md: 10, lg: 8, xl: 8 }} sx={{ position: 'relative' }}>
                            {isSwiperDataLoading ? (
                                <>
                                    <Skeleton sx={{ borderRadius: 4 }} variant="rounded" height={xl ? 500 : lg ? 450 : md ? 400 : sm ? 300 : 200} />
                                    <Box position="absolute" top="50%" left="50%" sx={{ transform: 'translate(-50%,-50%)' }}>
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
                                    {swiperData.map(swiper => (
                                        <SwiperSlide key={swiper.id}>
                                            <CardMedia
                                                height={xl ? 500 : lg ? 450 : md ? 400 : sm ? 300 : 200}
                                                component="img"
                                                image={swiper.image || undefined}
                                                alt={swiper.title}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                        </Grid>
                        {/* 右侧头文章+工具箱 */}
                        <Grid display={{ xs: 'none', lg: 'block' }} size={{ xs: 0, sm: 0, md: 0, lg: 4, xl: 4 }}>
                            <Stack height="100%" direction="column" justifyContent="space-between">
                                {/* 头文章 */}
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
                                            <CardMedia
                                                component="img"
                                                sx={{ height: { xl: 180, lg: 130 }, borderRadius: 4 }}
                                                image={headArticleData?.cover || undefined}
                                                alt={headArticleData?.title}
                                            />
                                            <CardContent>
                                                <Typography className="text-ellipsis-2" gutterBottom variant="subtitle1" fontWeight={500}>
                                                    {headArticleData?.title}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }} className="text-ellipsis-2">
                                                    {headArticleData?.abstractText}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    )}
                                </Card>
                                {/* 工具箱 */}
                                <Toolbox />
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Container maxWidth="xl" sx={{ p: 2, pl: { xl: 10, lg: 10 }, pr: { xl: 10, lg: 10 } }}>
                <Grid justifyContent="center" container spacing={xl ? 8 : lg ? 6 : 0}>
                    <Grid size={{ xs: 12, sm: 11, md: 10, lg: 8, xl: 8 }} sx={{ position: 'relative' }}></Grid>
                    <Grid display={{ xs: 'none', lg: 'block' }} size={{ xs: 0, sm: 0, md: 0, lg: 4, xl: 4 }}>
                        <RelatedLinkCard />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Home;
