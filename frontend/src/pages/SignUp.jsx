import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // TEMP signup success
    navigate("/signin");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p>Join OpsMind AI</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-btn" type="submit">
            Sign Up
          </button>
        </form>

        <div className="auth-switch">
          Already have an account?{" "}
          <span onClick={() => navigate("/signin")}>Sign In</span>
        </div>
      </div>
    </div>
  );
}
