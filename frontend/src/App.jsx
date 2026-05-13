import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const stored = localStorage.getItem("tourism_user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("tourism_user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("tourism_user");
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50">
      <div className="animate-spin w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full" />
    </div>
  );

  if (!user) return <LoginPage onLogin={handleLogin} />;
  return <HomePage user={user} onLogout={handleLogout} />;
}
