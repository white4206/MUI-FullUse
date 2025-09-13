const mapUrl = (url: string | undefined | null, failureUrl?: string) => {
    return url ? new URL(import.meta.env.VITE_APP_BASE_API + url, import.meta.url).href : (failureUrl ?? '');
};

const openUrl = (url: string, external?: boolean): void => {
    window.open((external ?? true) ? url : location.href.split('/')[0] + url);
};

export { mapUrl, openUrl };
