import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
const userSession = JSON.parse(localStorage.getItem('user'));

const HomeRedirect = ({ children }) => {
    const user = useSelector((state) => state.user);
    let location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/home', { state: { from: location } });
        }
    }, [user, location]);
    return children;
};

export default HomeRedirect;