import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from '../../hooks/useAuth'

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    let isAllowed = false
    for (let i = 0; i < allowedRoles.length; i++) {
        if (auth?.role?.includes(allowedRoles[i])) {
            isAllowed = true
            break
        } else {
            isAllowed = false
        }
    }

    return (
        isAllowed
            ? <Outlet />
            : auth?.accessToken //changed from user to accessToken to persist login after refresh
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;