
import "./Home.css";
import Features from "../components/Features";
import Chat from "./Chat";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";


export default function Home() {
    const navigate = useNavigate();


const handleStartDemo = () => {
  navigate("/chat");
};


  return (
    <section className="hero">
      {/* TOP BADGE */}
      <div className="hero-badge">
        <span className="dot" />
        Enterprise Knowledge Intelligence
      </div>

      {/* MAIN HEADING */}
      <h1 className="hero-title">
        Find Any Answer in <br />
        <span>Seconds, Not Hours</span>
      </h1>

      {/* SUBTEXT */}
      <p className="hero-subtitle">
        OpsMind AI transforms your corporate documents into an intelligent
        assistant. Get instant, accurate answers with verified citations —
        powered by advanced RAG technology.
      </p>

      {/* CTA BUTTONS */}
      <div className="hero-actions">
                    <button className="start-demo-btn" onClick={handleStartDemo}>
            Start Demo
            </button>

      </div>

      {/* FEATURE CHIPS */}
      <div className="hero-features">
        <span>⚡ Instant Answers</span>
        <span>📄 Verified Citations</span>
        <span>🛡️ Hallucination Guardrails</span>
      </div>

        {/* FEATURES SECTION */}
      <section id="features">
        <Features />
      </section>

    
      {/* <section id="demo">
        <Chat />
      </section>
       */}
    </section>

  );
}

