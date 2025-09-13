import request, { type ApiResponse } from '@/utils/request';
import type { HeadArticle } from '@/api/types';

export const getHeadArticle = (): Promise<ApiResponse<HeadArticle>> => {
    return request({
        url: '/article/getHeadArticle',
        method: 'get',
        headers: {
            isToken: false,
        },
    });
};
