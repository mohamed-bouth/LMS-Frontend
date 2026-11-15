
import { useState } from "react";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";

function App() {
  const [view, setView] = useState("login");
  const [session, setSession] = useState(null);

  if (session) {
    return (
      <main className="grid min-h-screen place-items-center bg-white px-6 text-center text-[#182038]">
        <div>
          <h1 className="font-['Poppins'] text-3xl">Welcome, {session.profile.name || session.profile.email}</h1>
          <p className="mt-3 text-[#697188]">Signed in as {session.profile.role}.</p>
          <button
            className="mt-6 rounded-[9px] bg-[#4f46d9] px-5 py-3 text-sm text-white"
            type="button"
            onClick={() => setSession(null)}
          >
            Sign out
          </button>
        </div>
      </main>
    );
  }

  if (view === "register") {
    return <RegisterPage onNavigate={setView} />;
  }

  return <LoginPage onAuthenticated={setSession} onNavigate={setView} />;
}

export default App