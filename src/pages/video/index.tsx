import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import FastForwardRoundedIcon from '@mui/icons-material/FastForwardRounded';
import FastRewindRoundedIcon from '@mui/icons-material/FastRewindRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRoundedIcon from '@mui/icons-material/VolumeDownRounded';

const WallPaper = styled('div')({
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    overflow: 'hidden',
    background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
    transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
    '&::before': {
        content: '""',
        width: '140%',
        height: '140%',
        position: 'absolute',
        top: '-40%',
        right: '-50%',
        background: 'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
    },
    '&::after': {
        content: '""',
        width: '140%',
        height: '140%',
        position: 'absolute',
        bottom: '-50%',
        left: '-30%',
        background: 'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
        transform: 'rotate(30deg)',
    },
});

const Widget = styled('div')(({ theme }) => ({
    padding: 16,
    borderRadius: 16,
    width: 343,
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(40px)',
    ...theme.applyStyles('dark', {
        backgroundColor: 'rgba(0,0,0,0.6)',
    }),
}));

const CoverImage = styled('div')({
    width: 100,
    height: 100,
    objectFit: 'cover',
    overflow: 'hidden',
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
    '& > img': {
        width: '100%',
    },
});

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});

const MusicPlayerSlider = () => {
    const duration = 200; // seconds
    const [position, setPosition] = React.useState<number>(32);
    const [paused, setPaused] = React.useState<boolean>(false);
    function formatDuration(value: number) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }
    return (
        <Box sx={{ width: '500px', overflow: 'hidden', position: 'relative', p: 3, borderRadius: 2, m: 2 }}>
            <Widget>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CoverImage>
                        <img alt="can't win - Chilling Sunday" src="https://mui.com/static/images/sliders/chilling-sunday.jpg" />
                    </CoverImage>
                    <Box sx={{ ml: 1.5, minWidth: 0 }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                            Jun Pulse
                        </Typography>
                        <Typography noWrap>
                            <b>คนเก่าเขาทำไว้ดี (Can&apos;t win)</b>
                        </Typography>
                        <Typography noWrap sx={{ letterSpacing: -0.25 }}>
                            Chilling Sunday &mdash; คนเก่าเขาทำไว้ดี
                        </Typography>
                    </Box>
                </Box>
                <Slider
                    aria-label="time-indicator"
                    size="small"
                    value={position}
                    min={0}
                    step={1}
                    max={duration}
                    onChange={(_, value) => setPosition(value)}
                    sx={t => ({
                        color: 'rgba(0,0,0,0.87)',
                        height: 4,
                        '& .MuiSlider-thumb': {
                            width: 8,
                            height: 8,
                            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                            '&::before': {
                                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                            },
                            '&:hover, &.Mui-focusVisible': {
                                boxShadow: `0px 0px 0px 8px ${'rgb(0 0 0 / 16%)'}`,
                                ...t.applyStyles('dark', {
                                    boxShadow: `0px 0px 0px 8px ${'rgb(255 255 255 / 16%)'}`,
                                }),
                            },
                            '&.Mui-active': {
                                width: 20,
                                height: 20,
                            },
                        },
                        '& .MuiSlider-rail': {
                            opacity: 0.28,
                        },
                        ...t.applyStyles('dark', {
                            color: '#fff',
                        }),
                    })}
                />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mt: -2,
                    }}
                >
                    <TinyText>{formatDuration(position)}</TinyText>
                    <TinyText>-{formatDuration(duration - position)}</TinyText>
                </Box>
                <Box
                    sx={theme => ({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: -1,
                        '& svg': {
                            color: '#000',
                            ...theme.applyStyles('dark', {
                                color: '#fff',
                            }),
                        },
                    })}
                >
                    <IconButton aria-label="previous song">
                        <FastRewindRoundedIcon fontSize="large" />
                    </IconButton>
                    <IconButton aria-label={paused ? 'play' : 'pause'} onClick={() => setPaused(!paused)}>
                        {paused ? <PlayArrowRoundedIcon sx={{ fontSize: '3rem' }} /> : <PauseRoundedIcon sx={{ fontSize: '3rem' }} />}
                    </IconButton>
                    <IconButton aria-label="next song">
                        <FastForwardRoundedIcon fontSize="large" />
                    </IconButton>
                </Box>
                <Stack
                    spacing={2}
                    direction="row"
                    sx={theme => ({
                        mb: 1,
                        px: 1,
                        '& > svg': {
                            color: 'rgba(0,0,0,0.4)',
                            ...theme.applyStyles('dark', {
                                color: 'rgba(255,255,255,0.4)',
                            }),
                        },
                    })}
                    alignItems="center"
                >
                    <VolumeDownRoundedIcon />
                    <Slider
                        aria-label="Volume"
                        defaultValue={30}
                        sx={t => ({
                            color: 'rgba(0,0,0,0.87)',
                            '& .MuiSlider-track': {
                                border: 'none',
                            },
                            '& .MuiSlider-thumb': {
                                width: 24,
                                height: 24,
                                backgroundColor: '#fff',
                                '&::before': {
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                                },
                                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                                    boxShadow: 'none',
                                },
                            },
                            ...t.applyStyles('dark', {
                                color: '#fff',
                            }),
                        })}
                    />
                    <VolumeUpRoundedIcon />
                </Stack>
            </Widget>
            <WallPaper />
        </Box>
    );
};

const Video = () => {
    const theme = useTheme();

    return (
        <Box overflow="hidden">
            <Card sx={{ display: 'flex', justifyContent: 'space-between', width: 380, borderRadius: 2, m: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            Live From Space
                        </Typography>
                        <Typography variant="subtitle1" component="div" sx={{ color: 'text.secondary' }}>
                            Mac Miller
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <IconButton aria-label="previous">{theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}</IconButton>
                        <IconButton aria-label="play/pause">
                            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                        </IconButton>
                        <IconButton aria-label="next">{theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}</IconButton>
                    </Box>
                </Box>
                <CardMedia component="img" sx={{ width: 151 }} image="https://mui.com/static/images/cards/live-from-space.jpg" />
            </Card>
            <MusicPlayerSlider />
        </Box>
    );
};
export default Video;
