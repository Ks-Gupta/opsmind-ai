import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import robot from "../assets/robot.png";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔐 Auth
  const { user, logout } = useAuth();

  // 🎨 Theme
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const scrollTo = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDemoClick = () => {
    if (user) navigate("/chat");
    else navigate("/demo");
  };

  return (
    <div className="header">
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-logo" onClick={() => navigate("/")}>
        <img src={robot} alt="Robot" className="nav-icon" />
        <span>OPSMIND AI</span>
      </div>

      {/* CENTER */}
      <div className="nav-center">
        <button onClick={() => scrollTo("features")}>Features</button>
        <button onClick={handleDemoClick}>Demo</button>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        {/* THEME */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {/* NOT LOGGED IN */}
        {!user && (
          <>
            <button className="signin" onClick={() => navigate("/signin")}>
              Sign In
            </button>
            <button className="cta-btn" onClick={() => navigate("/signup")}>
              Get Started
            </button>
          </>
        )}

        {/* USER LOGGED IN */}
        {user && user.role === "user" && (
          <>
            <button className="role-chip">👤 User</button>
            <button className="signin" onClick={logout}>
              Logout
            </button>
          </>
        )}

        {/* ADMIN LOGGED IN */}
        {user && user.role === "admin" && (
          <>
            <button className="role-chip">🛡 Admin</button>
            <button
              className="dashboard-btn"
              onClick={() => navigate("/admin")}
            >
              Dashboard
            </button>
            <button className="signin" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
    </div>
  );
}
