import {useGetUserQuery, useLoginMutation} from "../apiSlice.ts";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../slices/user.ts";
import {logout} from "../slices/auth.ts";

export const useAuth = () => {
    const dispatch = useDispatch();
    const { data, error, isLoading } = useGetUserQuery();

    const user = data ? data : null;
    dispatch(setUser(user!));

    return {
        user,
        isLoading,
        error,
    };
};

export const useLogin = () => {
    const [login, { data, error, isLoading }] = useLoginMutation();

    // if (error) {
    //     dispatch(logout());
    //     navigate('/account/login');
    // }

    const token = data ? data : null;

    return {
        login,
        token,
        isLoading,
        error,
    };
};