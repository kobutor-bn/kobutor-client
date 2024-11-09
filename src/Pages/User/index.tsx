import Button from "../../Components/Button.tsx";

function User() {
    return (

        <div
            className="max-w-md w-full mx-auto h-screen flex flex-col justify-center items-center gap-5 p-6 md:max-h-screen">
            <p className="font-bold text-5xl text-center md:text-left">User Settings</p>
            <form className="flex flex-col w-full pt-12 gap-5">
                <div className="flex flex-col md:flex-row w-full gap-5">
                    <input
                        className="border-[1px] p-3 w-full md:w-1/2"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Full Name"/>
                    <input
                        className="border-[1px] p-3 w-full md:w-1/2"
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"/>
                </div>
                <input
                    className="border-[1px] p-3 w-full"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"/>
                <input
                    className="border-[1px] p-3 w-full"
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Phone"/>
                <input
                    className="border-[1px] p-3 w-full"
                    type="text"
                    name="avatar"
                    id="avatar"
                    placeholder="Phone"/>
                <input
                    className="border-[1px] p-3 w-full"
                    type="password"
                    id="old_password"
                    placeholder="Current Password"/>
                <input
                    className="border-[1px] p-3 w-full"
                    type="password"
                    id="password"
                    placeholder="New Password"/>
                <Button text="Save Changes" size="large" color='primary'></Button>
            </form>
            {/*ID string `json:"id" binding:"required"`*/}
            {/*Name *string `json:"name,omitempty"`*/}
            {/*Phone *string `json:"phone,omitempty"`*/}
            {/*Email       *string   `json:"email,omitempty"`*/}
            {/*Username    *string   `json:"username,omitempty"`*/}
            {/*Avatar      *string   `json:"avatar,omitempty"`*/}
            {/*CartId      *string   `json:"cart_id,omitempty"`*/}
        </div>
    )
}

export default User;