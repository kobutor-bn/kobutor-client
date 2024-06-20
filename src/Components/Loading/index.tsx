import React from 'react';
import "./index.css";

const Loading: React.FC = () => {
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <p className="text-lg text-center font-semibold loading-dots">
                Loading
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
                <br/>Please wait
            </p>
        </div>
    );
};

export default Loading;