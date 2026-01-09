import { useState,useEffect } from "react";
import api from "../Services/api";
import "./Chat.css";

export default function Chat() {
  // CHAT STATES
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm OpsMind AI. Ask me about company SOPs." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // UPLOAD STATES
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // SEND MESSAGE
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/ask", { question: userMsg.text });
      setMessages(prev => [
        ...prev,
        { role: "assistant", text: res.data.answer }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: "assistant", text: "❌ Server error. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

const handleUpload = async () => {
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    setUploading(true);

    const res = await api.post("/upload", formData);

    setUploadedFiles(prev => [
  ...prev,
  {
    name: res.data.filename,
    size: (res.data.size / 1024 / 1024).toFixed(2) + " MB",
  },
]);


    setFile(null);
  } catch (err) {
    console.error(err);
    alert("Upload failed");
  } finally {
    setUploading(false);
  }
};

useEffect(() => {
  api.get("/upload/list").then(res => {
    setUploadedFiles(
      res.data.map(f => ({
        name: f.name,
        size: (f.size / 1024 / 1024).toFixed(2) + " MB",
      }))
    );
  });
}, []);





  return (
    <section className="chat-wrapper">
      <div className="chat-layout">

        {/* CHAT PANEL */}
        <div className="chat-panel">
          <div className="chat-header">
            <h3>OpsMind AI</h3>
            <span className="online-dot">● Online</span>
          </div>

          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>
                <div className="bubble">{m.text}</div>
              </div>
            ))}
            {loading && <div className="bubble">Typing...</div>}
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about company policies..."
              onKeyDown={e => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>

        {/* RIGHT PANEL – UPLOAD */}
        <div className="kb-panel">
          <h4>Knowledge Base</h4>
          <p className="kb-sub">
            Upload documents to index in the RAG pipeline
          </p>

          <div className="upload-box">
            <input
              type="file"
              accept=".pdf"
              onChange={e => setFile(e.target.files[0])}
            />
            <p>{file ? file.name : "Choose PDF file"}</p>

            <button onClick={handleUpload} disabled={!file || uploading}>
              {uploading ? "Uploading..." : "Upload PDF"}
            </button>
          </div>

          {/* 👇 UPLOADED FILES SHOW HERE */}
          <div className="uploaded-files">
  {uploadedFiles.map((doc, i) => (
    <div className="doc" key={i}>
      <span className="doc-title">{doc.name}</span>
      <span className="doc-size">{doc.size}</span>
    </div>
  ))}
</div>

        </div>

      </div>
    </section>
  );
}

