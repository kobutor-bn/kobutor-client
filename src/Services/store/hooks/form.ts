import {MutationTrigger} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {useState} from "react";
import {useGlobal} from "../../../GlobalProvider.tsx";

export const useFormMutation = <T>() => {
    const {userCtx} = useGlobal();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);

    const request = async (
        action: "create" | "update",
        mutation: MutationTrigger<(args: T) => unknown>,
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

    return {request, helper, isCreateOpen, isUpdateOpen, setIsCreateOpen, setIsUpdateOpen}
}