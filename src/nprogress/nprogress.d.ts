declare module 'nprogress' {
    const NProgress: {
        start: () => void;
        done: () => void;
        set: (n: number) => void;
        inc: (amount?: number) => void;
        configure: (options: Record<string, any>) => void;
        status: number | null;
    };
    export default NProgress;
}
