import React from 'react';
import info from './info.json';

const AboutUs: React.FC = () => {
    const {title, subtitle, content} = info.aboutUs;

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-10">
            <h1 className="text-3xl font-semibold text-indigo-600 mb-4">{title}</h1>
            <p className="text-lg text-slate-700 mb-6 font-light">{subtitle}</p>
            {content.map((paragraph, index) => (
                <p key={index} className="text-slate-600 mb-4 font-Nunito">{paragraph}</p>
            ))}
        </div>
    );
};

export default AboutUs;