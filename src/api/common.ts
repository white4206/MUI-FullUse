import request, { type ApiResponse } from '@/utils/request.js';

export const getCarousel = (): Promise<ApiResponse<Carousel[]>> => {
    return request({
        url: '/getCarousel',
        method: 'get',
        headers: {
            isToken: false,
        },
    });
};
