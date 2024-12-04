import {useState} from "react";
import Avatar from "../../Components/Avatar";
import Form from "../../Components/Form";
import {z} from "zod";
import {useGlobal} from "../../GlobalProvider.tsx";
import {useUpdateUser} from "../../Services/store/hooks/user.ts";
import Error from "../Error.tsx";
import Address from "../../Components/Address";
import {userSettingsFormConfig} from "../../Components/Form/config.ts";
import {userSettingsSchema} from "../../Components/Form/schema.ts";

function User() {
    const {userCtx} = useGlobal();
    const user = userCtx.user;
    const {updateUser, error} = useUpdateUser();
    const [tab, setTab] = useState<"personal" | "addresses">("personal");

    const configWithSubmit = {
        ...userSettingsFormConfig,
        schema: userSettingsSchema,
        onSubmit: async (values: z.infer<typeof userSettingsSchema>) => {
            try {
                if (userCtx.isAuthenticated) {
                    await updateUser({
                        ...values,
                        id: user?.id,
                    }).unwrap();
                    console.log("User Settings updated successfully");
                } else {
                    return <Error error={error}/>;
                }
            } catch (error) {
                console.error("Failed to submit user update:", error);
            }
        },
    };

    const avatar = () => {
        return <div className="flex justify-center bg-gray-50 shadow-md gap-4 py-6 border-b">
            <Avatar/>
            <div className="flex flex-col text-center justify-center">
                <h1 className="text-2xl font-bold capitalize">{user?.name || "User Name"}</h1>
                <h2 className="text-gray-500 capitalize">{user?.username}</h2>
                <p className="text-gray-500">{user?.email}</p>
            </div>
        </div>
    }

    const tabs = () => {
        return <div className="flex justify-center gap-6 shadow-sm border-b pb-2 p-6">
            <button
                className={`pb-2 ${tab === "personal" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
                onClick={() => setTab("personal")}
            >
                Personal Info
            </button>
            <button
                className={`pb-2 ${tab === "addresses" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
                onClick={() => setTab("addresses")}
            >
                Address
            </button>
        </div>
    }

    const tabContent = () => {
        return <div className="">
            {tab === "personal" ? (
                <div>
                    <div>
                        <Form defaultValues={user} title="Personal Info" {...configWithSubmit}/>
                    </div>
                </div>
            ) : (
                <Address/>
            )}
        </div>
    }

    return (
        <div className="max-w-4xl mx-auto">
            {avatar()}
            {tabs()}
            {tabContent()}
        </div>
    );
}

export default User;