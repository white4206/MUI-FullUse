const FONT_SAMPLE = [
    { id: 1, variant: 'h1', content: 'h1. Heading', sx: {} },
    { id: 2, variant: 'h2', content: 'h2. Heading', sx: {} },
    { id: 3, variant: 'h3', content: 'h3. Heading', sx: {} },
    { id: 4, variant: 'h4', content: 'h4. Heading', sx: {} },
    { id: 5, variant: 'h5', content: 'h5. Heading', sx: {} },
    { id: 6, variant: 'h6', content: 'h6. Heading', sx: {} },
    { id: 7, variant: 'subtitle1', content: 'subtitle1. SubTitle ', sx: {} },
    { id: 8, variant: 'subtitle2', content: 'subtitle2. SubTitle ', sx: {} },
    { id: 9, variant: 'body1', content: 'body1. Body', sx: {} },
    { id: 10, variant: 'body2', content: 'body2. Body', sx: {} },
    { id: 11, variant: 'button', content: 'button Text', sx: { display: 'block' } },
    { id: 12, variant: 'caption', content: 'caption Text', sx: { display: 'block' } },
    { id: 13, variant: 'overline', content: 'overline Text', sx: { display: 'block' } },
];

const FOLLOW_SYSTEM = 'auto';

enum ThemeMode {
    LIGHT = 'light',
    DARK = 'dark',
    SYSTEM = FOLLOW_SYSTEM,
}

export { FONT_SAMPLE, FOLLOW_SYSTEM, ThemeMode };
