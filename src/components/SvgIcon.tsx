interface IconProps {
    prefix?: string;
    iconName: string;
    iconClass?: string;
    size?: string;
    color?: string;
}

const SvgIcon = ({ prefix = 'icon', iconName, iconClass, size = '1em', color }: IconProps) => (
    <svg className={iconClass} style={{ width: size, height: size, overflow: 'hidden', fill: 'currentcolor' }}>
        <use xlinkHref={`#${prefix}-${iconName}`} fill={color} />
    </svg>
);

export default SvgIcon;
