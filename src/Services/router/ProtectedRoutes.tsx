import {useNavigate} from "react-router-dom";
import {ReactNode, useEffect} from "react";
import Error from "../../Pages/Error.tsx";
import Loading from "../../Components/Loading";
import {useGetUserQuery} from "../store/apiSlice.ts";

const ProtectedRoute = ({children}: { children: ReactNode }) => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetUserQuery();

    const user = data ? data : null;

    useEffect(() => {
        if (!user) {
            navigate('/account/login');
        }
    }, [navigate, user]);

    if (isLoading) return <Loading/>;
    if (error) return <Error error={error} />;

    return children;
};

export default ProtectedRoute;