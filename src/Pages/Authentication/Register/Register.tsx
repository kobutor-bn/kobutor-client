import Button from "../../../Components/Button.tsx";

function Register() {
    return (
        <div
            className="font-Nunito max-w-md w-full m-auto flex flex-col justify-center items-center gap-5 p-6 py-20">
            <p className="font-bold text-5xl">Kobutor</p>
            <p className="font-semibold text-xl">Peace be upon you!</p>
            <form className="flex flex-col w-full gap-5">
                <input className="border-[1px] p-3" type="text" name="First Name" id="firstName"
                       placeholder="First Name"/>
                <input className="border-[1px] p-3" type="text" name="Last Name" id="lastName" placeholder="Last Name"/>
                <input className="border-[1px] p-3" type="text" name="email" id="email" placeholder="Email"/>
                <input className="border-[1px] p-3" type="text" id="password" placeholder="Password"/>
                <h3 className="text-sm mb-[-16px]">Birthday</h3>
                <input className="border-[1px] p-3" type="date" name="birthday" id="birthday" placeholder="Birthday"/>

                <h3 className="text-sm mb-[-16px]">Gender</h3>
                <ul className="items-center w-full text-sm font-medium sm:flex">
                    <li className="w-full">
                        <div className="border-[1px] p-3 flex items-center ps-3">
                            <input id="male" type="radio" value="" name="gender"
                                   className="w-4 h-4 focus:ring-black focus:ring-2"/>
                            <label htmlFor="male"
                                   className="w-full ms-2 font-medium">Male</label>
                        </div>
                    </li>
                    <li className="w-full">
                        <div className="border-[1px] p-3 flex items-center ps-3">
                            <input id="female" type="radio" value="" name="gender"
                                   className="w-4 h-4 focus:ring-blue-500 focus:ring-2"/>
                            <label htmlFor="female"
                                   className="w-full ms-2 font-medium">Female</label>
                        </div>
                    </li>
                </ul>

                <Button text="Sign Up" size="large" color='primary'></Button>
                {/*<input className="bg-black text-white p-3" type="submit" value="Login"/>*/}
            </form>
            <div className="flex items-center w-full">
                <div className="h-[1px] mr-2 bg-gray-400 w-full"></div>
                <p>Or</p>
                <div className="h-[1px] ml-2 bg-gray-400 w-full"></div>
            </div>
            <div className="flex flex-col gap-3 w-full">
                <Button text="Sign Up with Google" size="large" color='primary'></Button>
                <Button text="Sign Up with Facebook" size="large" color='secondary'></Button>
            </div>
        </div>
    )
}

export default Register;