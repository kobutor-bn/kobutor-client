import Button from "../../Components/Button.tsx";

function User() {
    return (
        <div
            className="max-w-md w-full mx-auto h-screen flex flex-col justify-center items-center gap-5 p-6 md:max-h-screen">
            <p className="font-bold text-5xl text-center md:text-left">User Settings</p>
            <form className="flex flex-col w-full pt-12 gap-5">
                <div className="flex flex-col md:flex-row w-full gap-5">
                    <input className="border-[1px] p-3 w-full md:w-1/2" type="text" name="First Name" id="firstName"
                           placeholder="First Name"/>
                    <input className="border-[1px] p-3 w-full md:w-1/2" type="text" name="Last Name" id="lastName"
                           placeholder="Last Name"/>
                </div>
                <input className="border-[1px] p-3 w-full" type="text" name="email" id="email" placeholder="Email"/>
                <input className="border-[1px] p-3 w-full" type="password" id="currentPassword"
                       placeholder="Current Password"/>
                <input className="border-[1px] p-3 w-full" type="password" id="newPassword" placeholder="New Password"/>
                <input className="border-[1px] p-3 w-full" type="password" id="confirmNewPassword"
                       placeholder="Confirm New Password"/>
                <Button text="Save Changes" size="large" color='primary'></Button>
            </form>
        </div>
    )
}

export default User;