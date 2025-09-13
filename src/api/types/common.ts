export interface Carousel {
    id: number;
    title: string;
    image: string;
}
export interface ToolOption {
    id: number;
    icon: string;
    name: string;
    path: string;
}
export interface RelatedLink {
    id: number;
    icon: string;
    title: string;
    url: string;
    sideIcon?: string;
    subLinks?: Omit<RelatedLink, 'subLinks'>[];
}
