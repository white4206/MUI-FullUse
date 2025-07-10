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
export const getToolOption = (): Promise<ApiResponse<ToolOption[]>> => {
    return request({
        url: '/getToolOption',
        method: 'get',
        headers: {
            isToken: false,
        },
    });
};
