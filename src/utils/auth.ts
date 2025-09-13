import Cookies from 'js-cookie';
import { TOKEN_KEY } from '@/constant';

const getToken = () => {
    return Cookies.get(TOKEN_KEY);
};

const setToken = (token: string) => {
    return Cookies.set(TOKEN_KEY, token);
};

const removeToken = () => {
    return Cookies.remove(TOKEN_KEY);
};

export { getToken, setToken, removeToken };
