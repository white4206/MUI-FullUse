import request, { type ApiResponse } from '@/utils/request.js';

export const getHeadArticle = (): Promise<ApiResponse<HeadArticle>> => {
    return request({
        url: '/article/getHeadArticle',
        method: 'get',
        headers: {
            isToken: false,
        },
    });
};
