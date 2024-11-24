import {useLoginMutation} from "../apiSlice.ts";

export const useLogin = () => {
    const [login, {data, error, isLoading}] = useLoginMutation();

    const token = data ? data : null;

    return {
        login,
        token,
        isLoading,
        error,
    };
};