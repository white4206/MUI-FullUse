import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import createVitePlugins from './vite';

export default defineConfig(({ mode, command }) => {
    const env = loadEnv(mode, process.cwd());
    const { VITE_APP_ENV, VITE_APP_PROXY } = env;
    return {
        base: VITE_APP_ENV === 'production' ? '/' : '/',
        plugins: createVitePlugins(env, command === 'build'),
        server: {
            port: 80,
            host: true,
            proxy: {
                // https://cn.vitejs.dev/config/#server-proxy
                '/dev-api': {
                    target: VITE_APP_PROXY,
                    changeOrigin: true,
                    rewrite: p => p.replace(/^\/dev-api/, ''),
                },
            },
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
    };
});
