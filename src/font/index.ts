import { useUserPreference } from '@/store';

const useFont = () => {
    const fonts = [
        { id: 1, name: 'Roboto', font: "'Roboto','Helvetica','Arial',sans-serif" },
        { id: 2, name: '阿里妈妈方圆体', font: "'阿里妈妈方圆体 VF Regular', 'Roboto','Helvetica','Arial',sans-serif" },
    ];
    const fontTypographyList = [
        { id: 1, variant: 'h1', content: 'h1. Heading', sx: {} },
        { id: 2, variant: 'h2', content: 'h2. Heading', sx: {} },
        { id: 3, variant: 'h3', content: 'h3. Heading', sx: {} },
        { id: 4, variant: 'h4', content: 'h4. Heading', sx: {} },
        { id: 5, variant: 'h5', content: 'h5. Heading', sx: {} },
        { id: 6, variant: 'h6', content: 'h6. Heading', sx: {} },
        { id: 7, variant: 'subtitle1', content: 'subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur', sx: {} },
        { id: 8, variant: 'subtitle2', content: 'subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur', sx: {} },
        {
            id: 9,
            variant: 'body1',
            content:
                'body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.',
            sx: {},
        },
        {
            id: 10,
            variant: 'body2',
            content:
                'body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.',
            sx: {},
        },
        { id: 11, variant: 'button', content: 'button text', sx: { display: 'block' } },
        { id: 12, variant: 'caption', content: 'caption text', sx: { display: 'block' } },
        { id: 13, variant: 'overline', content: 'overline text', sx: { display: 'block' } },
    ];
    const setFont = useUserPreference(state => state.setFont);

    const changeFont = (font: string) => {
        document.documentElement.style.setProperty('--full-use-user-font-family', font);
        setFont(font);
    };

    return { fonts, fontTypographyList, changeFont };
};

export default useFont;
