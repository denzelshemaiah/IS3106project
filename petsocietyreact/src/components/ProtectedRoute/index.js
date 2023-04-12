import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({user, children}) => {
    let navigate = useNavigate("/signIn");
    if (!user) {
        navigate('/signIn');
    }
    return children;
};

export default ProtectedRoute;