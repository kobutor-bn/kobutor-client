import React from 'react';
import Button from "../../Button";
import {Link} from "react-router-dom";

interface Props {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginPrompt: React.FC<Props> = ({isOpen, setIsOpen}) => {
    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="flex flex-col gap-8">
            <p className="text-lg text-center font-bold">Please Login or Register to continue</p>
            <div className="flex gap-3">
                <Link className="flex-grow w-full" to="/account/login">
                    <Button onClick={toggleModal} text="Login" color="secondary" size="large"
                            className="w-full"/>
                </Link>
                <Link className="flex-grow w-full" to="/register">
                    <Button onClick={toggleModal} text="Sign Up" color="primary" size="large"
                            className="w-full"/>
                </Link>
            </div>
        </div>
    );
};

export default LoginPrompt;