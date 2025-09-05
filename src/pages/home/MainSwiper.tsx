import { getCarousel } from '@/api/common';
import { defaultCarousel } from '@/utils/constant';
import { useBreakpoint } from '@/hooks';
import { mapUrl } from '@/utils/url';
import { Skeleton, Box, CircularProgress, CardMedia, CardActionArea } from '@mui/material';
import { useState, useEffect } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Carousel } from '@/api/types';
import FULink from '@/components/FULink';

const MainSwiper = () => {
    const { xl, lg, md, sm } = useBreakpoint();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [swiperData, setSwiperData] = useState<Carousel[]>([]);

    useEffect(() => {
        // * 获取轮播图数据
        const getCarouselData = async () => {
            const res = await getCarousel();
            setSwiperData(res.data.map(carousel => ({ ...carousel, image: mapUrl(carousel.image) || defaultCarousel })));
            setIsLoading(false);
        };
        void getCarouselData();
    }, []);

    return isLoading ? (
        <>
            <Skeleton sx={{ borderRadius: 4 }} variant="rounded" height={xl ? 480 : lg ? 480 : md ? 480 : sm ? 320 : 160} />
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
                    <CardActionArea component={FULink} to="/article" target="_blank">
                        <CardMedia
                            component="img"
                            height={xl ? 480 : lg ? 480 : md ? 480 : sm ? 320 : 160}
                            image={swiper.image || undefined}
                            alt={swiper.title}
                        />
                    </CardActionArea>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
export default MainSwiper;
