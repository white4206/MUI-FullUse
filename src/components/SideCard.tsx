import { Card, CardActions, CardContent, CardHeader, CardMedia } from '@mui/material';
import type { CardActionsProps, CardContentProps, CardHeaderProps, CardMediaProps, CardProps } from '@mui/material';
import type { ReactNode } from 'react';

export interface SideCardProps {
    avatar?: CardHeaderProps['avatar'];
    title?: CardHeaderProps['title'];
    subheader?: CardHeaderProps['subheader'];
    headerAction?: CardHeaderProps['action'];
    children?: ReactNode;
    actions?: ReactNode;
    cardProps?: CardProps;
    cardHeaderProps?: CardHeaderProps;
    cardMediaProps?: CardMediaProps;
    cardContentProps?: CardContentProps;
    cardActionsProps?: CardActionsProps;
}

const SideCard = (props: SideCardProps) => {
    const { avatar, title, subheader, headerAction, children, actions, cardProps, cardHeaderProps, cardMediaProps, cardContentProps, cardActionsProps } = props;

    return (
        <Card elevation={3} {...cardProps}>
            <CardHeader
                avatar={avatar}
                title={title}
                subheader={subheader}
                action={headerAction}
                slotProps={{ title: { variant: 'h6' } }}
                sx={{ pb: 0 }}
                {...cardHeaderProps}
            />
            <CardMedia {...cardMediaProps} />
            <CardContent sx={{ pt: 0, pb: '16px !important' }} {...cardContentProps}>
                {children}
            </CardContent>
            {actions && <CardActions {...cardActionsProps}>{actions}</CardActions>}
        </Card>
    );
};

export default SideCard;
