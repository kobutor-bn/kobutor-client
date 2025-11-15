import { useState } from "react";
import { useGlobal } from "../../../GlobalProvider.tsx";

export const useFormMutation = () => {
    const { userCtx } = useGlobal();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);

    const request = async <T,>(
        action: "create" | "update",
        mutation: (arg: T) => Promise<any>,
        values: T
    ) => {
        try {
            if (userCtx.isAuthenticated) {
                await mutation(values)
                    .then(() => {
                        setIsCreateOpen(false);
                        setIsUpdateOpen(false);
                    })
                helper(action);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const helper = (action: "create" | "update") => {
        console.log(action === "create" ? "Created successfully" : "Updated successfully");
    };

    return { request, helper, isCreateOpen, isUpdateOpen, setIsCreateOpen, setIsUpdateOpen }
}