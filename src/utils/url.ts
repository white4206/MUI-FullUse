const mapUrl = (url: string | null, failureUrl = null) => {
    return url ? new URL(import.meta.env.VITE_APP_BASE_API + url, import.meta.url).href : failureUrl;
};

const openUrl = (url: string, external = true): void => {
    window.open(external ? url : location.href.split('/')[0] + url);
};

export { mapUrl, openUrl };
