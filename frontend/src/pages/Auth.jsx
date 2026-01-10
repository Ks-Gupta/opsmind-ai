import { useState } from "react";
import "./Auth.css";
import robot from "../assets/robot.png";
import { useLocation, useNavigate } from "react-router-dom";
 import { useAuth } from "../context/AuthContext";


export default function Auth() {
  const [role, setRole] = useState("user"); // user | admin

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ MODE FIRST
  const mode = location.pathname === "/signup" ? "signup" : "signin";

  const { login } = useAuth();


  // ✅ THEN handlers
  const handleSignIn = () => {
  login({
    email: "dummy@email.com",
    role: role, // user | admin
  });

  if (role === "admin") {
    navigate("/admin");
  } else {
    navigate("/chat");
  }
};

  const handleSignUp = () => {
  login({
    email: "dummy@email.com",
    role: role,
  });

  navigate("/chat");
};


  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* LOGO */}
        <div className="auth-logo">
          <img src={robot} alt="OpsMind AI" />
          <span>OpsMindAI</span>
        </div>

        {/* ROLE TOGGLE */}
        <div className="auth-role-toggle">
          <button
            className={`role-btn ${role === "user" ? "active" : ""}`}
            type="button"
            onClick={() => setRole("user")}
          >
            👤 User
          </button>

          <button
            className={`role-btn ${role === "admin" ? "active" : ""}`}
            type="button"
            onClick={() => setRole("admin")}
          >
            🛡 Admin
          </button>
        </div>

        {/* ROLE BADGE */}
        <div className="role-status">
          <span>
            {role === "admin" ? "🛡" : "👤"} Signing In As{" "}
            {role === "admin" ? "Admin" : "User"}
          </span>
        </div>

        {/* TITLE */}
        <h2 className="auth-title">
          {mode === "signin" ? "Welcome Back" : "Create Account"}
        </h2>

        <p className="auth-subtitle">
          {mode === "signin"
            ? "Sign in to continue"
            : "Join OpsMind AI today"}
        </p>

        {/* EMAIL */}
        <div className="auth-group">
          <label>Email</label>
          <div className="auth-input">
            <input type="email" placeholder="you@company.com" />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="auth-group">
          <label>Password</label>
          <div className="auth-input">
            <input type="password" placeholder="••••••••" />
          </div>
        </div>

        {/* CONFIRM PASSWORD */}
        {mode === "signup" && (
          <div className="auth-group">
            <label>Confirm Password</label>
            <div className="auth-input">
              <input type="password" placeholder="••••••••" />
            </div>
          </div>
        )}

        {/* PRIMARY BUTTON */}
        <button
          type="button"
          className="auth-btn"
          onClick={mode === "signin" ? handleSignIn : handleSignUp}
        >
          {mode === "signin" ? "Sign In" : "Create Account"}
        </button>

        {/* FOOTER */}
        <p className="auth-footer">
          {mode === "signin" ? (
            <>
              Don’t have an account?{" "}
              <span onClick={() => navigate("/signup")}>Sign Up</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => navigate("/signin")}>Sign In</span>
            </>
          )}
        </p>

      </div>
    </div>
  );
}
