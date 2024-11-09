import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../Components/Button.tsx";
import { useLogin } from "../../../Services/store/hooks/auth.ts";

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [account, setAccount] = useState("");
    const [secret, setSecret] = useState("");
    const [source] = useState("username");
    const { login, isLoading } = useLogin();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            await login({ account, secret, source })
                .unwrap()
                .then(() => navigate('/'))
        } catch (error: any) {
            setError(error?.data?.message || "Login failed");
        }
    };

    return (
        <div className="font-Nunito max-w-md w-full m-auto flex flex-col justify-center items-center gap-5 p-6 py-20">
            <p className="font-bold text-5xl">Kobutor</p>
            <p className="font-semibold text-xl">Peace be upon you!</p>

            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
                {error && <div className="bg-red-200 text-red-600 p-5">{error}</div>}
                <input
                    required
                    className="border-[1px] p-3"
                    type="text"
                    name="account"
                    id="account"
                    placeholder="Username"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                />
                <input
                    required
                    className="border-[1px] p-3"
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                />
                <Button text="Login" type="submit" size="large" color="primary" disabled={isLoading}/>
            </form>

            <div className="flex items-center w-full">
                <div className="h-[1px] mr-2 bg-gray-400 w-full"></div>
                <p>Or</p>
                <div className="h-[1px] ml-2 bg-gray-400 w-full"></div>
            </div>
            <div className="flex flex-col gap-3 w-full">
                <Button text="Sign in with Google" size="large" color="primary" />
                <Button text="Sign in with Facebook" size="large" color="secondary" />
            </div>
            <div>
                Don't have an account yet?
                <Link className="ml-1 underline" to="/register">
                    Register now
                </Link>
            </div>
        </div>
    );
}

export default Login;