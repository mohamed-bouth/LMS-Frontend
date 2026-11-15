
import { useState } from "react";
import Icon from "./components/Icon.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import { getCurrentProfile } from "./features/auth/services/profileService.js";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import Sidebar from "./layouts/components/Sidebar.jsx";

function App() {
  const [view, setView] = useState("login");
  const [session, setSession] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleAuthenticated(nextSession) {
    const profile = await getCurrentProfile(nextSession.token);
    if (!profile) {
      throw new Error("The authenticated profile is missing.");
    }

    setSession({ ...nextSession, profile });
    setView("profile");
  }

  if (session) {
    return (
      <div className="min-h-screen bg-[#fafafe] text-[#182038]">
        <Sidebar
          profile={session.profile}
          view={view}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onNavigate={setView}
          onLogout={() => {
            setSession(null);
            setView("login");
          }}
        />
        <div className="min-h-screen lg:ml-[250px]">
          <header className="flex h-[76px] items-center border-b border-[#e7e8ef] bg-white px-5 sm:px-8 lg:px-10">
            <button className="mr-4 text-[#4f46d9] lg:hidden" type="button" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}>
              <Icon name="menu" size={22} />
            </button>
            <div className="ml-auto flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[#dcecff] text-[11px] font-bold text-[#2b63a7]">
                {(session.profile.name || session.profile.email).slice(0, 1).toUpperCase()}
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold">{session.profile.name || session.profile.email}</p>
                <p className="text-[10px] text-[#969baa]">{session.profile.role}</p>
              </div>
            </div>
          </header>
          {view === "profile" ? (
            <ProfilePage profile={session.profile} onNavigate={setView} />
          ) : (
            <main className="grid min-h-[calc(100vh-76px)] place-items-center px-6 text-center">
              <div>
                <h1 className="font-['Poppins'] text-2xl text-[#202647]">My Courses</h1>
                <p className="mt-2 text-sm text-[#697188]">Your enrolled courses will appear here.</p>
              </div>
            </main>
          )}
        </div>
      </div>
    );
  }

  if (view === "register") {
    return <RegisterPage onNavigate={setView} />;
  }

  return <LoginPage onAuthenticated={handleAuthenticated} onNavigate={setView} />;
}

export default App