import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentProfile } from "../services/profileService"
import { useNavigate } from "react-router";

const AuthContext = createContext(null)


export function AuthProvider({children}){

    const routerNavigate = useNavigate()

    const [session, setSession] = useState(() => {
        const storedSession = sessionStorage.getItem("lms-session")
        return storedSession ? JSON.parse(storedSession): null
    })

    useEffect(() => {
        if(!session){
            return routerNavigate("/login")
        }

        if(["admin", "trainer"].includes(session.user?.role?.toLowerCase())){
            return routerNavigate("/manage/courses")
        }else{
            return routerNavigate("/enrollments/my")
        }
    },[session])

    async function handleAuthenticated(nextSession) {
        const user = await getCurrentProfile(nextSession.token);
            if (!user) {
            throw new Error("The authenticated profile is missing.");
            }
            
            if(session){
                sessionStorage.removeItem("lms-session")
            }
            sessionStorage.setItem("lms-session", JSON.stringify({ token: nextSession.token, user: user }))
            setSession({ ...nextSession, user });
            
    }

    function handleLogout(){
        if(session){
            sessionStorage.removeItem("lms-session")
        }
        setSession(null)

    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: session?.token ? true : false,
                isManager: ["admin", "trainer"].includes(session?.user?.role?.toLowerCase()),
                token: session?.token,
                user: session?.user,
                session,

                setSession,
                handleAuthenticated,
                handleLogout
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth(){

    const context = useContext(AuthContext)

    return context
}