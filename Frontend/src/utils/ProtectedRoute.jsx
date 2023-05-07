// Desc: This file contains the ProtectedRoute component which is used to protect routes from unauthenticated users.
import Landing from "../components/Landing";

const ProtectedRoute = ({ children }) => {
    const userIsLogged = localStorage.getItem('user') ? true : false;

    if (!userIsLogged) {
        return <Landing />;
    }
    return children;
};


export default ProtectedRoute;