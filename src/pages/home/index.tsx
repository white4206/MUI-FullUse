import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, IconButton, Paper, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useBreakpoint } from '@/utils/hook';
import HandymanIcon from '@mui/icons-material/Handyman';
import { useTranslation } from 'react-i18next';
import SvgIcon from '@/components/SvgIcon';

const ToolBoxItem = () => {
    const theme = useTheme();

    return (
        <>
            <CardActionArea sx={{ borderRadius: 2 }}>
                <Stack
                    flex={1}
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
        </>
    );
};

const Home = () => {
    const theme = useTheme();
    const { xl, lg, md, sm } = useBreakpoint();
    const { t } = useTranslation();
    const swiperData = [
        { id: 1, url: 'https://mui.com/static/images/cards/contemplative-reptile.jpg' },
        { id: 2, url: 'https://mui.com/static/images/cards/contemplative-reptile.jpg' },
        { id: 3, url: 'https://mui.com/static/images/cards/contemplative-reptile.jpg' },
        { id: 4, url: 'https://mui.com/static/images/cards/contemplative-reptile.jpg' },
    ];
    return (
        <>
            <Box bgcolor={theme.palette.bgColor}>
                <Container maxWidth="xl" sx={{ p: 2, pl: { xl: 10, lg: 10 }, pr: { xl: 10, lg: 10 } }}>
                    <Grid justifyContent="center" container spacing={xl ? 8 : lg ? 6 : 0}>
                        <Grid size={{ xs: 12, sm: 11, md: 10, lg: 8, xl: 8 }}>
                            <Swiper
                                style={{ borderRadius: 8 }}
                                modules={[Pagination]}
                                pagination={{ clickable: true, dynamicBullets: true }}
                                autoplay={{ pauseOnMouseEnter: true }}
                                loop
                            >
                                {swiperData.map(swiper => {
                                    return (
                                        <SwiperSlide key={swiper.id}>
                                            <CardMedia
                                                sx={{ borderRadius: 2 }}
                                                height={xl ? 500 : lg ? 450 : md ? 400 : sm ? 300 : 200}
                                                component="img"
                                                image={swiper.url}
                                            />
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </Grid>
                        <Grid display={{ xs: 'none', lg: 'block' }} size={{ xs: 0, sm: 0, md: 0, lg: 4, xl: 4 }}>
                            <Stack height="100%" direction="column" justifyContent="space-between">
                                <Card sx={{ borderRadius: 2 }} elevation={3}>
                                    <CardActionArea>
                                        <CardMedia
                                            sx={{ height: { xl: 180, lg: 130 } }}
                                            image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                                        />
                                        <CardContent>
                                            <Typography
                                                className="text-ellipsis-2"
                                                gutterBottom
                                                variant="subtitle1"
                                                fontWeight={500}
                                                component="div"
                                                sx={{ '&:hover': { textDecoration: 'underline' } }}
                                            >
                                                在 Spring Boot 中部署 Vue 单页面应用（SPA）并启用 Vue Router 的 history 模式
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }} className="text-ellipsis-2">
                                                在 Spring Boot 中部署 Vue 单页面应用（SPA）并启用 Vue Router 的 history 模式时，需通过后端配置确保所有非静态资
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                                <Card sx={{ borderRadius: 4 }} elevation={3}>
                                    <CardContent sx={{ p: '0 !important' }}>
                                        <Typography gutterBottom fontWeight={600} variant="h6" component="div">
                                            <Stack direction="row" alignItems="center" p={2} pb={0}>
                                                工具箱
                                                <Tooltip title={t('toolbox.edit')} placement="right">
                                                    <IconButton sx={{ borderRadius: 2, ml: 1, transition: '.4s', '&:hover': { transform: 'rotate(15deg)' } }}>
                                                        <HandymanIcon sx={{ fontSize: 14, color: theme.palette.fullUseMain.main }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </Typography>
                                        <Paper
                                            sx={{
                                                borderRadius: 4,
                                                borderTop: `4px solid ${theme.palette.fullUseMain.main}`,
                                                bgcolor: theme.palette.navBarButtonBgColor,
                                            }}
                                        >
                                            <Stack direction="row" p={1}>
                                                {[1, 2, 3, 4].map(item => {
                                                    return <ToolBoxItem key={item} />;
                                                })}
                                            </Stack>
                                        </Paper>
                                    </CardContent>
                                </Card>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default Home;
