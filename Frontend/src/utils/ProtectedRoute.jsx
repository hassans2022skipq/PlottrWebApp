// Desc: This file contains the ProtectedRoute component which is used to protect routes from unauthenticated users.
import Landing from "../components/Landing";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ children }) => {
    const userIsLogged = useSelector(state => state.user);
    if (!userIsLogged) {
        return <Landing />;
    }
    return children;
};


export default ProtectedRoute;