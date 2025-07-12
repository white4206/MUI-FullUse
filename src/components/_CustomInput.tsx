/**
 * @deprecated Use FuTextField instead
 * */

import { styled, InputBase, alpha, FormControl, InputLabel, type InputBaseProps, type SxProps } from '@mui/material';

const BootstrapInput = styled(InputBase)(({ theme, fullWidth }) => ({
    'label + &': {
        marginTop: theme.spacing(3.5),
    },
    '& .MuiInputBase-input': {
        borderRadius: 16,
        position: 'relative',
        border: '1px solid',
        borderColor: theme.palette.buttonBorderColor,
        fontSize: 14,
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
        width: fullWidth ? '100%' : 'auto',
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.5)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));

const BootstrapInputLabel = styled(InputLabel)(({ theme }) => ({
    transform: 'none',
    color: theme.palette.text.primary,
    '&.Mui-focused': {
        color: 'inherit',
    },
}));

interface CustomInputProps {
    sx?: SxProps;
    label?: string;
    fullWidth?: boolean;
    inputBaseProps?: InputBaseProps;
}

const CustomInput = (props: CustomInputProps) => {
    const { sx, label, fullWidth, inputBaseProps } = props;
    return (
        <FormControl sx={{ ...sx }} fullWidth={fullWidth} variant="standard">
            {label && <BootstrapInputLabel shrink>{label}</BootstrapInputLabel>}
            <BootstrapInput {...inputBaseProps} fullWidth sx={{ ...inputBaseProps?.sx }} />
        </FormControl>
    );
};

export default CustomInput;
