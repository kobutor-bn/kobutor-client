import {useDispatch, useSelector} from "react-redux";
import {isAuthenticatedSelector, setUser} from "../slices/auth.ts";
import {useEffect} from "react";
import {useGetUserQuery, useUpdateUserInfoMutation} from "../apiSlice.ts";

export const useUser = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(isAuthenticatedSelector);
    const {data, isLoading} = useGetUserQuery(undefined, {
        skip: !isAuthenticated,
    });

    useEffect(() => {
        if (data && !isLoading) {
            dispatch(setUser(data!));
        }
    }, [data, isLoading, dispatch]);

    const isUserLoading = isLoading;
    const user = data;

    return {
        user,
        isAuthenticated,
        isUserLoading,
    }
}

export const useUpdateUser = () => {
    const [updateUser, {isLoading, error}] = useUpdateUserInfoMutation();

    return {
        updateUser,
        isLoading,
        error,
    }
}