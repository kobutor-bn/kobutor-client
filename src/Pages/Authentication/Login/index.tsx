import Button from "../../../Components/Button.tsx";

function Login() {
    return (
        <div
            className="max-h-screen max-w-md w-full m-auto h-screen flex flex-col justify-center items-center gap-5 p-6">
            <p className="font-bold text-5xl">Kobutor</p>
            <p className="font-semibold text-xl">Peace be upon you!</p>
            <form className="flex flex-col w-full gap-5">
                <input className="border-[1px] p-3" type="text" name="email" id="email" placeholder="Email"/>
                <input className="border-[1px] p-3" type="text" id="password" placeholder="Password"/>
                <p className="mt-[-16px] text-xs underline">Forgot Password?</p>
                <Button text="Login" size="large" color='primary'></Button>
                {/*<input className="bg-black text-white p-3" type="submit" value="Login"/>*/}
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