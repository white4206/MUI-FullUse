import Cookies from 'js-cookie';
import config from '@/config';

export const getToken = () => Cookies.get(config.tokenKey);

export const setToken = (token: string) => Cookies.set(config.tokenKey, token);

export const removeToken = () => Cookies.remove(config.tokenKey);
