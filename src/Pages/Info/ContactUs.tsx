import React from 'react';
import info from './info.json';

const ContactUs: React.FC = () => {
    const {title, subtitle, address, phone, email, hours} = info.contactUs;

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-10">
            <h1 className="text-3xl font-semibold text-indigo-600 mb-4">{title}</h1>
            <p className="text-lg text-slate-700 mb-6 font-light">{subtitle}</p>

            <div className="text-slate-600 font-Nunito">
                <p className="mb-2">
                    <span className="font-semibold">Address: </span>{address}
                </p>
                <p className="mb-2">
                    <span className="font-semibold">Phone: </span>{phone}
                </p>
                <p className="mb-2">
                    <span className="font-semibold">Email: </span>{email}
                </p>
                <p className="mb-2">
                    <span className="font-semibold">Working Hours: </span>{hours}
                </p>
            </div>
        </div>
    );
};

export default ContactUs;