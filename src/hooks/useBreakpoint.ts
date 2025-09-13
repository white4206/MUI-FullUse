import useMediaQuery from '@mui/material/useMediaQuery';

const useBreakpoint = () => {
    /**
     * xs, extra-small: 0px
     * sm, small: 600px
     * md, medium: 900px
     * lg, large: 1200px
     * xl, extra-large: 1536px
     */
    const xs = useMediaQuery(theme => theme.breakpoints.between('xs', 'sm'));
    const sm = useMediaQuery(theme => theme.breakpoints.between('sm', 'md'));
    const md = useMediaQuery(theme => theme.breakpoints.between('md', 'lg'));
    const lg = useMediaQuery(theme => theme.breakpoints.between('lg', 'xl'));
    const xl = useMediaQuery(theme => theme.breakpoints.up('xl'));
    return { xs, sm, md, lg, xl };
};

export default useBreakpoint;
