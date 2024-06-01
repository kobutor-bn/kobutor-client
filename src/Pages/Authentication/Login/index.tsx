import Button from "../../../Components/Button.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store.ts";
import {login} from "../state.ts";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function Login() {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector((state: RootState) => state.auth)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email === 'admin' && password === '123456') {
            setTimeout(() => {
                dispatch(login({email, password}));
            }, 2000)
        } else {
            state.isLoggedIn = false;
            console.log("Login failed!")
        }
    };

    useEffect(() => {
        if (state.isLoggedIn) {
            navigate('/home');
        }
    }, [state.isLoggedIn, navigate]);

    return (
        <div
            className=" max-w-md w-full m-auto flex flex-col justify-center items-center gap-5 p-6 py-20">
            <p className="font-bold text-5xl">Kobutor</p>
            <p className="font-semibold text-xl">Peace be upon you!</p>

            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
                <input
                    className="border-[1px] p-3"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="border-[1px] p-3"
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p className="mt-[-16px] text-xs underline">Forgot Password?</p>
                <Button type="submit" text="Login" size="large"
                        color='primary'></Button>
            </form>

            <div className="flex items-center w-full">
                <div className="h-[1px] mr-2 bg-gray-400 w-full"></div>
                <p>Or</p>
                <div className="h-[1px] ml-2 bg-gray-400 w-full"></div>
            </div>
            <div className="flex flex-col gap-3 w-full">
                <Button text="Sign in with Google" size="large" color='primary'></Button>
                <Button text="Sign in with Facebook" size="large" color='secondary'></Button>
            </div>
        </div>

    )
}

export default Login;