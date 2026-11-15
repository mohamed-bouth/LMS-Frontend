
import { useState } from "react";
import RegisterPage from "./pages/auth/RegisterPage.jsx";

function App() {
  const [view, setView] = useState("login");
  return <RegisterPage onNavigate={setView} />;
}

export default App