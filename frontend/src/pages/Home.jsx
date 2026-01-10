
import "./Home.css";
import Features from "../components/Features";
import DemoChat from "./DemoChat";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStartDemo = () => {
    if (user) {
      navigate("/chat");        // real app
    } else {
      navigate("/signin", {
        state: { from: "/demo" } // 👈 IMPORTANT
      });
    }
  };

  return (
    <section className="hero">
      <div className="hero-badge">
        <span className="dot" />
        Enterprise Knowledge Intelligence
      </div>

      <h1 className="hero-title">
        Find Any Answer in <br />
        <span>Seconds, Not Hours</span>
      </h1>

      <p className="hero-subtitle">
        OpsMind AI transforms your corporate documents into an intelligent
        assistant.
      </p>

      <div className="hero-actions">
        <button className="start-demo-btn" onClick={handleStartDemo}>
          Start Demo
        </button>
      </div>

      <div className="hero-features">
        <span>⚡ Instant Answers</span>
        <span>📄 Verified Citations</span>
        <span>🛡️ Hallucination Guardrails</span>
      </div>

      <section id="features">
        <Features />
      </section>

      
      
    </section>
  );
}
