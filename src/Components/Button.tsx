import React from 'react';

interface ButtonProps {
    text: string;
    size?: 'small' | 'medium' | 'large';
    color?: 'primary' | 'secondary';
    shape?: 'circle' | 'square';
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    style?: React.CSSProperties;
    className?: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
                                           text,
                                           size = 'medium',
                                           color = 'primary',
                                           shape = 'square',
                                           onClick,
                                           type = 'button',
                                           style,
                                           className = '',
                                           disabled = false,
                                           ...rest
                                       }) => {
    const getClassNames = () => {
        const sizeClass = {
            small: 'p-1 text-sm',
            medium: 'p-2 text-lg',
            large: 'p-3 text-xl',
        }[size];

        const colorClass = {
            primary: 'bg-black text-white border border-black',
            secondary: 'bg-white text-black border border-black',
        }[color];

        const shapeClass = shape === 'circle' ? 'rounded-full px-3' : '';

        return `font-montserrat ${sizeClass} ${colorClass} ${shapeClass} ${className}`.trim();
    };

    return (
        <button
            type={type}
            onClick={onClick}
            style={style}
            className={getClassNames()}
            disabled={disabled}
            {...rest}
        >
            {text}
        </button>
    );
};

export default Button;