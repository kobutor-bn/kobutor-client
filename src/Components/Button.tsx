import React from "react";

interface ButtonProps {
    text: string;
    size?: 'small' | 'medium' | 'large';
    color?: 'primary' | 'secondary';
    shape?: 'circle' | 'square';
    onClick?: () => void;
    // children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
    const {size, color, shape, text, onClick} = props;
    let sizeClass = '';
    let colorClass = '';

    switch (size) {
        case 'small':
            sizeClass = 'p-1 text-sm';
            break;
        case 'medium':
            sizeClass = 'p-2 text-lg';
            break;
        case 'large':
            sizeClass = 'p-3 text-xl';
            break;
    }

    switch (color) {
        case 'primary':
            colorClass = 'bg-black text-white border border-black';
            break;
        case 'secondary':
            colorClass = 'bg-white border border-black';
            break;
    }

    return (
        <>
            <button onClick={onClick} className={`${colorClass}  p-2 ${sizeClass}`}>
                {text}
                {/*{children}*/}
            </button>
        </>
    )
}

export default Button