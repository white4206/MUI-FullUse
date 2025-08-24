import { getHeadArticle } from '@/api/article';
import { mapUrl } from '@/utils/url';
import { Card, Skeleton, CardContent, CardActionArea, CardMedia, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

const HeadArticle = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [headArticleData, setHeadArticleData] = useState<HeadArticle | null>(null);

    useEffect(() => {
        // * 获取头文章
        const getHeadArticleData = async () => {
            const res = await getHeadArticle();
            setHeadArticleData({
                ...res.data,
                cover: mapUrl(res.data.cover),
            });
            setIsLoading(false);
        };
        void getHeadArticleData();
    }, []);

    return (
        <Card elevation={3}>
            {isLoading ? (
                <>
                    <Skeleton height={160} sx={{ borderRadius: 4 }} variant="rounded" />
                    <CardContent>
                        <Skeleton height={24} sx={{ mb: 1, width: '70%' }} variant="rounded" />
                        <Skeleton height={24} sx={{ mb: 1 }} variant="rounded" />
                    </CardContent>
                </>
            ) : (
                <CardActionArea>
                    <CardMedia component="img" sx={{ height: 160, borderRadius: 4 }} image={headArticleData?.cover || undefined} alt={headArticleData?.title} />
                    <CardContent>
                        <Typography className="text-ellipsis-2" gutterBottom variant="subtitle1" fontWeight={500}>
                            {headArticleData?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className="text-ellipsis-2">
                            {headArticleData?.abstractText}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            )}
        </Card>
    );
};
export default HeadArticle;
