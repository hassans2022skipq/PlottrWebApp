import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
const userSession = JSON.parse(sessionStorage.getItem('user'));

const HomeRedirect = ({ children }) => {
    let location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        if (userSession) {
            navigate('/home', { state: { from: location } });
        }
        else {
            navigate('/', { state: { from: location } });
        }
    }, [userSession, location]);
    return children;
};

export default HomeRedirect;