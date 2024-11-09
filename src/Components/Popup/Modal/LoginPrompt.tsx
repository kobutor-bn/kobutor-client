import React from 'react';
import Button from "../../Button";
import {AppDispatch} from "../../../Services/store";
import {useDispatch} from "react-redux";
import {toggleModal} from "../../../Services/store/slices/modal";
import {Link} from "react-router-dom";

const LoginPrompt: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    return (
        <div className="flex flex-col gap-8">
            <p className="text-lg text-center font-bold">Please Login or Register to continue</p>
            <div className="flex gap-3">
                <Link className="flex-grow w-full" to="/account/login">
                    <Button onClick={() => dispatch(toggleModal())} text="Login" color="secondary" size="large"
                            className="w-full"/>
                </Link>
                <Link className="flex-grow w-full" to="/register">
                    <Button onClick={() => dispatch(toggleModal())} text="Sign Up" color="primary" size="large"
                            className="w-full"/>
                </Link>
            </div>
        </div>
    );
};

export default LoginPrompt;