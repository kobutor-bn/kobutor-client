import React from 'react';
import {LiaSpinnerSolid} from 'react-icons/lia';

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
    isLoading?: boolean;
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
                                           isLoading = false,
                                           ...rest
                                       }) => {
    // Class mapping for size, color, and shape
    const getClassNames = () => {
        const sizeClass = {
            small: 'p-2 text-sm',
            medium: 'p-3 text-lg',
            large: 'p-4 text-xl',
        }[size];

        const colorClass = {
            primary: 'bg-black text-white border border-black',
            secondary: 'bg-white text-black border border-black',
        }[color];

        const shapeClass = shape === 'circle' ? 'rounded-full px-6 py-6' : 'rounded';

        const disabledClass = isLoading || disabled
            ? 'opacity-60 cursor-not-allowed' // Slightly faded button and non-clickable
            : 'hover:opacity-90';

        return `font-montserrat ${sizeClass} ${colorClass} ${shapeClass} ${disabledClass} ${className}`.trim();
    };

    return (
        <button
            type={type}
            onClick={onClick}
            style={style}
            className={getClassNames()}
            disabled={isLoading || disabled} // Disable when loading or explicitly disabled
            {...rest}
        >
            {isLoading ? (
                <div className="flex items-center justify-center text-center">
                    <LiaSpinnerSolid className="animate-spin text-xl"/>
                </div>
            ) : (
                text
            )}
        </button>
    );
};

export default Button;