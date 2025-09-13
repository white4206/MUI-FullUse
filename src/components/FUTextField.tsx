import { Box, Stack, TextField, Typography } from '@mui/material';
import type { StackProps, TextFieldProps, CSSProperties } from '@mui/material';

export interface FuTextFieldProps {
    labelPosition?: 'left' | 'top';
    requiredColor?: CSSProperties['color'];
}

export type Layout = { labelMargin?: string; labelWidth?: 'auto' | '100%'; topRequired: boolean } & StackProps;

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
            <TextField size="small" {...rest} />
        </Stack>
    );
};

export default FuTextField;
