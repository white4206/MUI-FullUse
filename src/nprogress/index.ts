import NProgress from 'nprogress';
import '@/theme/index.css';
// 自定义 nprogress 样式文件
import '@/nprogress/index.css';

NProgress.configure({
    easing: 'ease', // 动画方式
    speed: 500, // 递增进度条的速度
    showSpinner: true, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3, // 初始化时的最小百分比
});
export default NProgress;
