import Icon from "../components/Icon.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { Outlet } from "react-router-dom";

export default function AuthenticatedLayout({
  user,
  sidebarOpen,
  onCloseSidebar,
  onOpenSidebar,
  onNavigate,
  onLogout,
  children,
}) {
  return (
    <div className="min-h-screen bg-[#fafafe] text-[#182038]">
      <Sidebar
        user={user}
        isOpen={sidebarOpen}
        onClose={onCloseSidebar}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
      <div className="min-h-screen lg:ml-[250px]">
        <header className="flex h-[76px] items-center border-b border-[#e7e8ef] bg-white px-5 sm:px-8 lg:px-10">
          <button
            className="mr-4 text-[#4f46d9] lg:hidden"
            type="button"
            aria-label="Open navigation"
            onClick={onOpenSidebar}
          >
            <Icon name="menu" size={22} />
          </button>
          <div className="ml-auto flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-[#dcecff] text-[11px] font-bold text-[#2b63a7]">
              {(user.name || user.email).slice(0, 1).toUpperCase()}
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold">{user.name || user.email}</p>
              <p className="text-[10px] text-[#969baa]">{user.role}</p>
            </div>
          </div>
        </header>
        {children ?? <Outlet />}
      </div>
    </div>
  );
}
