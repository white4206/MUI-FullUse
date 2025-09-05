import React, { useState } from 'react';
import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router-dom';
import { Link, type LinkProps } from '@mui/material';

export interface FULink {
    hoverColor?: LinkProps['color'];
}

const FULink = (props: FULink & LinkProps & RouterLinkProps) => {
    const { hoverColor, children, color, onMouseEnter, onMouseLeave, sx, ...rest } = props;
    const [isHover, setIsHover] = useState(false);

    return (
        <Link
            component={RouterLink}
            color={isHover ? (hoverColor ?? color) : color}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                setIsHover(true);
                onMouseEnter?.(e);
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                setIsHover(false);
                onMouseLeave?.(e);
            }}
            sx={{ transition: hoverColor ? '.2s' : undefined, ...sx }}
            {...rest}
        >
            {children}
        </Link>
    );
};

export default FULink;
