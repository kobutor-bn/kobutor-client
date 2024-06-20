import Button from "../../../Components/Button.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../Services/store";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {setUser, unsetUser} from "../../../Services/store/slices/user.ts";

function Login() {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email === 'admin' && password === '123456') {
            setTimeout(() => {
                dispatch(setUser({
                    id: "001",
                    email: "admin@example.com",
                    first_name: "admin",
                    last_name: "admin",
                    favorites: [],
                }));
                setError('');
            }, 2000)
        } else {
            dispatch(unsetUser());
            setError('Wrong email or password!');
        }
    };

    useEffect(() => {
        if (user !== null) {
            navigate('/home');
        }
    }, [user, navigate]);

    return (
        <div
            className=" max-w-md w-full m-auto flex flex-col justify-center items-center gap-5 p-6 py-20">
            <p className="font-bold text-5xl">Kobutor</p>
            <p className="font-semibold text-xl">Peace be upon you!</p>

            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
                {error ? <div className="bg-red-200 text-red-600 p-5">{error}</div> : <></>}
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
            <div>Don't have an account yet?
                <Link className="ml-1 underline" to={'/register'}>Register now</Link>
            </div>
        </div>

    )
}

export default Login;