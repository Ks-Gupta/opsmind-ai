import "./Features.css";

export default function Features() {
  return (
    <section className="features-section">
      <div className="features-container">

        <span className="features-eyebrow">CAPABILITIES</span>

        <h2 className="features-title">
          Built for Enterprise Trust
        </h2>

        <p className="features-subtitle">
          Every feature designed to eliminate wasted time and ensure every answer
          is accurate, verifiable, and actionable.
        </p>

        <div className="features-grid">

          <div className="feature-card">
            
            <h3>📄 Precision Citation Engine</h3>
            <p>
              Every answer includes the exact page number and document source.
              Verify any claim in seconds with our transparent citation system.
            </p>
          </div>

          <div className="feature-card">
           
            <h3>🛡️ Hallucination Guardrails</h3>
            <p>
              Our AI explicitly states "I don't know" when information isn't in
              your knowledge base. No fabricated answers.
            </p>
          </div>

          <div className="feature-card">
            
            <h3>⚡ Sub-Second Responses</h3>
            <p>
              Optimized RAG pipeline with vector search delivers answers in under
              2 seconds, even at enterprise scale.
            </p>
          </div>

          <div className="feature-card">
            
            <h3>📊  Admin Knowledge Graph</h3>
            <p>
              Visual dashboards show which documents are queried most. Identify
              gaps and optimize documentation.
            </p>
          </div>

          <div className="feature-card">
           
            <h3>🔒  Enterprise Security</h3>
            <p>
              Role-based access control, SSO integration, and SOC 2 compliance.
              Your knowledge stays protected.
            </p>
          </div>

          <div className="feature-card">
            
            <h3> 🔄  Real-Time Indexing</h3>
            <p>
              Documents are parsed, chunked, and embedded automatically. Updates
              reflect instantly.
            </p>
          </div>

        </div>
      </div>

       
    </section>

    
     
  );
}
