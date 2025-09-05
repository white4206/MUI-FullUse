import { getHeadArticle } from '@/api/article';
import { mapUrl } from '@/utils/url';
import { Card, Skeleton, CardContent, CardMedia, CardActionArea } from '@mui/material';
import { useState, useEffect } from 'react';
import type { HeadArticle as IHeadArticle } from '@/api/types';
import FULink from '@/components/FULink';

const HeadArticle = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [headArticleData, setHeadArticleData] = useState<IHeadArticle | null>(null);

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
                <>
                    <CardActionArea component={FULink} to="/article" target="_blank">
                        <CardMedia
                            component="img"
                            height={160}
                            sx={{ borderRadius: 4 }}
                            image={headArticleData?.cover || undefined}
                            alt={headArticleData?.title}
                        />
                    </CardActionArea>
                    <CardContent sx={{ pb: '16px !important' }}>
                        <FULink
                            className="text-ellipsis-2"
                            to="/article"
                            target="_blank"
                            underline="none"
                            color="textPrimary"
                            hoverColor="primary"
                            gutterBottom
                            variant="subtitle1"
                            fontWeight={500}
                        >
                            {headArticleData?.title}
                        </FULink>
                        <FULink className="text-ellipsis-2" to="/article" target="_blank" underline="none" variant="body2" color="textSecondary">
                            {headArticleData?.abstractText}
                        </FULink>
                    </CardContent>
                </>
            )}
        </Card>
    );
};
export default HeadArticle;
