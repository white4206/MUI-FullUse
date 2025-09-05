import { Box, Container, Grid, Stack } from '@mui/material';
import { useBreakpoint } from '@/hooks';
import Toolbox from '@/pages/home/Toolbox';
import RelatedLinkCard from '@/pages/home/RelatedLinkCard';
import MainSwiper from '@/pages/home/MainSwiper';
import HeadArticle from '@/pages/home/HeadArticle';
import ArticleItem from '../article/ArticleItem';

const Home = () => {
    const { xl, lg } = useBreakpoint();

    return (
        <>
            <Box bgcolor="bgColor">
                <Container maxWidth="xl" sx={{ p: 2, pl: { xl: 10, lg: 10 }, pr: { xl: 10, lg: 10 } }}>
                    <Grid justifyContent="center" container spacing={xl ? 8 : lg ? 6 : 0}>
                        {/* 左侧轮播图 */}
                        <Grid size={{ xs: 12, sm: 11, md: 10, lg: 8, xl: 8 }} sx={{ position: 'relative' }}>
                            <MainSwiper />
                        </Grid>
                        {/* 右侧头文章+工具箱 */}
                        <Grid display={{ xs: 'none', lg: 'block' }} size={{ xs: 0, sm: 0, md: 0, lg: 4, xl: 4 }}>
                            <Stack height="100%" direction="column" justifyContent="space-between">
                                <HeadArticle />
                                {/* 工具箱 */}
                                <Toolbox />
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Container maxWidth="xl" sx={{ p: 2, pl: { xl: 10, lg: 10 }, pr: { xl: 10, lg: 10 } }}>
                <Grid justifyContent="center" container spacing={xl ? 8 : lg ? 6 : 0}>
                    <Grid size={{ xs: 12, sm: 11, md: 10, lg: 8, xl: 8 }} sx={{ position: 'relative' }}>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <ArticleItem key={'Article' + index} data={{}} />
                        ))}
                    </Grid>
                    {/* 侧边卡片 */}
                    <Grid display={{ xs: 'none', lg: 'block' }} size={{ xs: 0, sm: 0, md: 0, lg: 4, xl: 4 }}>
                        {/* 相关链接卡片 */}
                        <RelatedLinkCard />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Home;
