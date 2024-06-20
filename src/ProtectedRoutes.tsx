import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "./Services/store";
import {ReactNode, useEffect} from "react";

const ProtectedRoute = ({children}: { children: ReactNode }) => {
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            console.log('yes');
        }
    }, [navigate, user]);

    return children;
};

export default ProtectedRoute;