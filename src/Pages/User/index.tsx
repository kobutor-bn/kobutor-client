import Button from "../../Components/Button.tsx";

function User() {
    return (
        <div
            className="max-h-screen max-w-md w-full m-auto h-screen flex flex-col justify-center items-center gap-5 p-6">
            <p className="font-bold text-5xl">User Settings</p>
            <form className="flex flex-col pt-12 gap-5">
                <div className="flex w-full gap-5">
                    <input className="border-[1px] p-3" type="text" name="First Name" id="firstName"
                           placeholder="First Name"/>
                    <input className="border-[1px] p-3" type="text" name="Last Name" id="lastName"
                           placeholder="Last Name"/>
                </div>
                <input className="border-[1px] p-3" type="text" name="email" id="email" placeholder="Email"/>
                <input className="border-[1px] p-3" type="password" id="password" placeholder="Current Password"/>
                <input className="border-[1px] p-3" type="password" id="password" placeholder="New Password"/>
                <input className="border-[1px] p-3" type="password" id="password" placeholder="Confirm New Password"/>

                <Button text="Save Changes" size="large" color='primary'></Button>
                {/*<input className="bg-black text-white p-3" type="submit" value="Login"/>*/}
            </form>
        </div>
    )
}

export default User;