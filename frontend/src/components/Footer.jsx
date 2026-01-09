import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <h3>OPSMIND AI</h3>
          <p>
            AI-powered document assistant to help you understand PDFs faster
            and ask questions with confidence.
          </p>
        </div>

        {/* Product */}
        <div className="footer-column">
          <h4>Product</h4>
          <a href="/">Home</a>
          <a href="/upload">Upload</a>
          <a href="/chat">Chat</a>
        </div>

        {/* Resources */}
        <div className="footer-column">
          <h4>Resources</h4>
          <a href="#">Documentation</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>

        {/* Social */}
        <div className="footer-column">
          <h4>Connect</h4>
          <a href="https://github.com" target="_blank">GitHub</a>
          <a href="#">LinkedIn</a>
          <a href="#">Twitter</a>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} OPSMIND AI. All rights reserved.
      </div>
    </footer>
  );
}
