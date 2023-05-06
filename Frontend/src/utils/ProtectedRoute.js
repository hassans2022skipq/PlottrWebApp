import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
const userSession = JSON.parse(localStorage.getItem('user'));

const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.user);
    let location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        if (!user && !userSession) {
            navigate('/', { state: { from: location } });
        }
    }, [user, location]);
    return children;
};

export default ProtectedRoute;