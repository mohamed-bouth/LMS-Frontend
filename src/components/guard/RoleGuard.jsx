import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../features/auth/contexts/AuthContext";

export default function RoleGuard({allowedRole, allowedRoles = [] }) {
  const { user } = useAuth()
  if(!user){
    return <Navigate to={"/login"}/>
  }
  const role = user.role
  const roles = allowedRoles.length > 0 ? allowedRoles : [allowedRole];
  const isAllowed = roles.some((item) => item && role?.toLowerCase() === item.toLowerCase());

  if (!isAllowed) {
    return (
      <main className="grid min-h-[calc(100vh-76px)] place-items-center px-6 text-center">
        <div>
          <h1 className="text-xl font-semibold text-[#30364d]">Access denied</h1>
          <p className="mt-2 text-sm text-[#697188]">You do not have permission to view this page.</p>
        </div>
      </main>
    );
  }

  return <Outlet/>;
}
