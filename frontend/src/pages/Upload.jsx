import { useState } from "react";
import "./Upload.css";

export default function Upload() {
  const [file, setFile] = useState(null);

  return (
    <section className="upload-wrapper">
      <div className="upload-layout">

        {/* LEFT PANEL */}
        <div className="upload-panel">
          <h2>
            Upload your <span>PDF</span>
          </h2>

          <p>
            We’ll analyze your document using AI and let you chat with it.
          </p>

          <label className="file-drop">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <span>
              {file ? file.name : "Click to choose a PDF file"}
            </span>
          </label>

          <button disabled={!file}>
            Upload PDF
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div className="kb-panel">
          <div className="upload-box">
            Drag & drop your documents<br />
            PDF, DOCX, TXT up to 50MB
          </div>
        </div>

      </div>
    </section>
  );
}
