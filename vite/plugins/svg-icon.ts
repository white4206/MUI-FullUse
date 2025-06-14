import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

const createSvgIcon = (isBuild: boolean) => {
    return createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
        symbolId: 'icon-[dir]-[name]',
        svgoOptions: isBuild,
    });
};
export default createSvgIcon;
