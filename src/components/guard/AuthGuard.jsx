import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../features/auth/contexts/AuthContext";

function AuthGuard() {
    const { user } = useAuth()

    if(!user){
        return <Navigate to={"/login"}/>
    }

    return <Outlet/>;
}

export default AuthGuard;