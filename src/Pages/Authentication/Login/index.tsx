import React, {useState} from "react";
import {Link, useNavigate, useLocation} from "react-router-dom";
import Button from "../../../Components/Button.tsx";
import {useLogin} from "../../../Services/store/hooks/auth.ts";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState<string | null>(null);
    const [account, setAccount] = useState("");
    const [secret, setSecret] = useState("");
    const [source] = useState("username");
    const {login, isLoading} = useLogin();

    // Get the page user was trying to access
    const from = (location.state as any)?.from?.pathname || '/';

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            await login({account, secret, source}).unwrap();

            // Navigate to the page they were trying to access or home
            navigate(from, {replace: true});
        } catch (error: any) {
            console.error("Login error:", error);
            setError(error?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="font-Nunito max-w-md w-full m-auto flex flex-col justify-center items-center gap-5 p-6 py-20">
            <p className="font-bold text-5xl">Kobutor</p>
            <p className="font-semibold text-xl">Peace be upon you!</p>

            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
                {error && (
                    <div className="bg-red-200 text-red-600 p-5 rounded">
                        {error}
                    </div>
                )}
                <input
                    required
                    className="border-[1px] p-3 rounded"
                    type="text"
                    name="account"
                    id="account"
                    placeholder="Username"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    disabled={isLoading}
                />
                <input
                    required
                    className="border-[1px] p-3 rounded"
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                    disabled={isLoading}
                />
                <Button
                    text={isLoading ? "Logging in..." : "Login"}
                    type="submit"
                    size="large"
                    color="primary"
                    disabled={isLoading}
                />
            </form>

            <div className="flex items-center w-full">
                <div className="h-[1px] mr-2 bg-gray-400 w-full"></div>
                <p>Or</p>
                <div className="h-[1px] ml-2 bg-gray-400 w-full"></div>
            </div>
            <div className="flex flex-col gap-3 w-full">
                <Button text="Sign in with Google" size="large" color="primary"/>
                <Button text="Sign in with Facebook" size="large" color="secondary"/>
            </div>
            <div>
                Don't have an account yet?
                <Link className="ml-1 underline" to="/account/register">
                    Register now
                </Link>
            </div>
        </div>
    );
}

export default Login;