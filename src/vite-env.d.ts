/// <reference types="vite/client" />

// 手动配置 virtual:svg-icons-register 其相应的类型声明
declare module 'virtual:svg-icons-register' {
    const component: any;
    export default component;
}

// 手动声明numeral国际化导入类型
declare module 'numeral/locales/chs' {
    const chs: any;
    export default chs;
}
