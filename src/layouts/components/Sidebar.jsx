import { useNavigate } from "react-router";
import Icon from "../../components/Icon.jsx";
import Logo from "../../components/Logo.jsx";
import { useAuth } from "../../features/auth/contexts/AuthContext.jsx";

export default function Sidebar({ isOpen, onClose }) {

  const { handleLogout, user, isAuthenticated } = useAuth()
  const navigate = useNavigate();

  const role = user?.role.toLowerCase()
  let items

  if(role === "admin"){
    items = [
      { label: "Courses", icon: "courses", view: "/manage/courses" },
      { label: "My Profile", icon: "profile", view: "profile" }
    ]
  }else if(role === "trainer"){
    items = [
      { label: "Courses", icon: "courses", view: "/manage/courses" },
      { label: "My Profile", icon: "profile", view: "profile" }
    ]
  }else if(role === "learner"){
    items = [
      { label: "My Enrolments", icon: "courses", view: "enrollments/my" },
      { label: "Courses", icon: "courses", view: "courses" },
      { label: "Modules", icon: "file", view: "courses/modules"},
      { label: "My Profile", icon: "profile", view: "profile" },
    ]
  }else{
    items = [
      { label: "Courses", icon: "courses", view: "courses" },
    ]
  }

  const name = user?.name || user?.email || "Guest";
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      {isOpen && (
        <button className="fixed inset-0 z-30 bg-[#182038]/30 lg:hidden" type="button" aria-label="Close navigation" onClick={onClose} />
      )}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[250px] -translate-x-full flex-col border-r border-[#e7e8ef] bg-white px-[18px] pb-[18px] pt-[25px] transition-transform lg:translate-x-0 ${isOpen ? "translate-x-0" : ""}`}>
        <div className="flex items-center justify-between px-2 pb-[31px]">
          <Logo />
          <button className="text-[#8e94a3] lg:hidden" type="button" aria-label="Close navigation" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>
        <div className="mb-2.5 px-3 text-[10px] font-bold uppercase tracking-[1.25px] text-[#9ca1b1]">{role === 'admin' || role === "trainer" ? `${user.role} workspace` : "Learner workspace"}</div>
        <nav className="flex flex-col gap-[5px]" aria-label="Main navigation">
          {items.map((item) => {
            return (
              <button
                className={`relative flex h-[46px] w-full items-center gap-3 rounded-[9px] px-[13px] text-left text-sm font-medium transition text-[#656d82] hover:bg-[#f7f7fb] hover:text-[#353c58]`}
                key={item.view}
                type="button"
                onClick={() => {
                  navigate(item.view)
                  onClose();
                }}
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="mt-auto grid grid-cols-[36px_1fr_30px] items-center gap-[9px] border-t border-[#e7e8ef] px-[5px] pb-0 pt-3.5">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-[#dcecff] text-[11px] font-bold text-[#2b63a7]">{initials}</div>
          <div className="flex min-w-0 flex-col">
            <strong className="truncate text-[11px]">{name}</strong>
            <span className="mt-0.5 text-[10px] text-[#969baa]">{user?.role}</span>
          </div>
          {isAuthenticated && <button className="text-[#8e94a3] transition hover:text-[#d34b65]" type="button" aria-label="Log out" onClick={handleLogout}>
            <Icon name="logout" size={18} />
          </button>}
          
        </div>
      </aside>
    </>
  );
}
