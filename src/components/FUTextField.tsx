import { Box, Stack, styled, TextField, Typography } from '@mui/material';
import type { StackProps, TextFieldProps, CSSProperties } from '@mui/material';

const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': { fontSize: '0.875rem', fontWeight: 500, backgroundColor: theme.palette.inputBgColor, borderRadius: 16 },
    '& .MuiInputBase-root .MuiOutlinedInput-notchedOutline': { transition: '.4s' },
    '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': { borderWidth: 2, borderColor: theme.palette.primary.main },
    '& fieldset': { borderWidth: 2, borderRadius: 16, borderColor: 'transparent' },
    marginBottom: '0 !important',
}));

interface FuTextFieldProps {
    labelPosition?: 'left' | 'top';
    requiredColor?: CSSProperties['color'];
}

type Layout = { labelMargin?: string; labelWidth?: 'auto' | '100%'; topRequired: boolean } & StackProps;

const FuTextField = (props: FuTextFieldProps & TextFieldProps) => {
    const { labelPosition = 'top', requiredColor = 'currentcolor', label, required, ...rest } = props;
    const layout: Layout =
        labelPosition === 'left'
            ? {
                  direction: 'row',
                  alignItems: 'center',
                  mb: 1,
                  labelMargin: '0 8px 0 0',
                  labelWidth: 'auto',
                  topRequired: false,
              }
            : {
                  direction: 'column',
                  alignItems: 'start',
                  mb: 1,
                  labelMargin: '0 0 8px 0',
                  labelWidth: '100%',
                  topRequired: true,
              };
    const { labelWidth, labelMargin, topRequired, ...layoutRest } = layout;
    return (
        <Stack {...layoutRest}>
            <Stack direction="row" width={labelWidth}>
                {required && !layout.topRequired && (
                    <Box color={requiredColor} mr={0.5}>
                        *
                    </Box>
                )}
                <Typography flexShrink={0} m={labelMargin} variant="body2">
                    {label}
                </Typography>
                {required && topRequired && (
                    <Box color={requiredColor} ml={0.5}>
                        *
                    </Box>
                )}
            </Stack>
            <CustomTextField size="small" {...rest} />
        </Stack>
    );
};

export { CustomTextField };
export default FuTextField;
