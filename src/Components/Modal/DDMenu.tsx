import React from 'react';
import './index.css';
import Theme from "../Theme/Theme.tsx";

const DDMenu: React.FC = () => {
    return (
        <div className="h-screen w-full">
            <div className="flex justify-center items-center flex-col gap-4 text-black">
                <Theme></Theme>
                <p className="">Shop</p>
                <p>Others</p>
            </div>
        </div>
    );
};

export default DDMenu;