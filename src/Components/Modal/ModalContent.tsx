import React from 'react';
import './index.css';
import Theme from "../Theme/Theme.tsx";
import {Link} from "react-router-dom";

const ModalContent: React.FC = () => {
    return (
        <div className="h-screen w-full">
            <div className="flex justify-center items-center flex-col gap-4 text-black">
                <Theme></Theme>
                <Link to={'/product/listing'}>SHOP</Link>
                <p>Others</p>
            </div>
        </div>
    );
};

export default ModalContent;