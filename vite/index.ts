import react from '@vitejs/plugin-react';
import createSvgIcon from './plugins/svg-icon';
import type { Plugin, PluginOption } from 'vite';

const createVitePlugins = (viteEnv: Record<string, string>, isBuild = false) => {
    const vitePlugins: PluginOption[] | Plugin = [react()];
    vitePlugins.push(createSvgIcon(isBuild));
    return vitePlugins;
};
export default createVitePlugins;
