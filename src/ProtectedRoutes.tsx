import {useNavigate} from "react-router-dom";
import {ReactNode, useEffect} from "react";
import {useAuth} from "./Services/hooks/auth.ts";

const ProtectedRoute = ({children}: { children: ReactNode }) => {
    const navigate = useNavigate();
    const { user, isLoading, error } = useAuth();

    useEffect(() => {
        if (!user) {
            navigate('/account/login');
        }
    }, [navigate, user]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading tag data</p>;

    return children;
};

export default ProtectedRoute;