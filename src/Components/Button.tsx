import React from "react";

interface ButtonProps {
    text: string;
    size?: 'small' | 'medium' | 'large';
    color?: 'primary' | 'secondary';
    shape?: 'circle' | 'square';
    onClick?: (...args: any[]) => void;
    type?: 'button' | 'submit' | 'reset';
    // children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
    const {size, color, shape, type, text, onClick} = props;
    let sizeClass = '';
    let colorClass = '';
    let shapeClass = '';

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

    switch (shape) {
        case 'circle':
            shapeClass = 'rounded-3xl px-3';
            break;
        case 'square':
            shapeClass = '';
            break;
    }

    return (
        <>
            <button type={type} onClick={onClick} className={`${colorClass} ${shapeClass}  p-2 ${sizeClass}`}>
                {text}
                {/*{children}*/}
            </button>
        </>
    )
}

export default Button