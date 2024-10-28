import {useGetUserQuery} from "../store/apiSlice.ts";
import {useNavigate} from "react-router-dom";

// only use this hook for protected routes
export const useAuth = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");

    if (!token) {
        navigate('/account/login');
    }

    const { data, error, isLoading } = useGetUserQuery();
    if (error) {
        navigate('/account/login');
    }

    const user = data ? data : null;

    return {
        user,
        isLoading,
        error,
    };
};