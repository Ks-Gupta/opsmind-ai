import "./DemoChat.css";
import { useNavigate } from "react-router-dom";

export default function DemoChat() {
  const navigate = useNavigate();

  return (
    <section className="chat-wrapper">
      <h1 className="live-demo-title">Live Product Demo</h1>
      <p className="live-demo-desc">
        Experience how OpsMind AI answers questions from your internal documents.
      </p>

      <div className="chat-layout">
        {/* CHAT */}
        <div className="chat-panel">
          <div className="chat-header">
            <span>OpsMind AI</span>
            <span className="demo-badge">Demo Mode</span>
          </div>

          <div className="chat-messages">
            <div className="msg assistant">
              <div className="bubble">
                👋 Hi! I'm OpsMind AI.  
                Ask me anything about your company’s internal policies.
              </div>
            </div>

            <div className="msg user">
              <div className="bubble">
                What is the customer support escalation process?
              </div>
            </div>

            <div className="msg assistant">
              <div className="bubble">
                <ul>
                  <li>Severity 1 → Immediate escalation</li>
                  <li>Severity 2 → Within 1 hour</li>
                  <li>Severity 3 → Within 24 hours</li>
                  <li>Severity 4 → Within 72 hours</li>
                </ul>
                <p>📄 Source: Customer-Support-SOP.pdf</p>
              </div>
            </div>
          </div>

          {/* INPUT */}
          <div className="chat-input">
            <input
              disabled
              placeholder="Sign in to ask your own questions..."
            />
            <button onClick={() => navigate("/signin")}>Sign In</button>
          </div>
        </div>

        {/* KNOWLEDGE BASE */}
        <div className="kb-panel">
          <h4>Knowledge Base</h4>
          <p className="kb-sub">
            Uploads are disabled in demo mode.
          </p>

          <div className="upload-box demo-disabled">
            🔒 Sign in to unlock document uploads
          </div>
        </div>
      </div>
    </section>
  );
}
