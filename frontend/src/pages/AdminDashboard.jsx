import { useState } from "react";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [documents, setDocuments] = useState([
    { id: 1, name: "HR_Policy_2024.pdf", queries: 892, status: "indexed" },
    { id: 2, name: "Employee_Handbook.pdf", queries: 654, status: "indexed" },
    { id: 3, name: "IT_Security_Guide.pdf", queries: 423, status: "indexed" },
    { id: 4, name: "Benefits_Overview.pdf", queries: 312, status: "processing" },
    { id: 5, name: "Onboarding_Checklist.pdf", queries: 287, status: "indexed" }
  ]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setDocuments(prev => [
      ...prev,
      {
        id: Date.now(),
        name: file.name,
        queries: 0,
        status: "processing"
      }
    ]);
  };

  const handleView = (doc) => {
    alert(`Viewing document: ${doc.name}`);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this document?")) return;
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  return (
    <div className="admin-dashboard">

      {/* HEADER */}
      <h1 className="page-title">
        Manage your knowledge base and monitor usage analytics
      </h1>

      {/* STATS */}
      <div className="stats-grid">
        <StatCard title="Total Documents" value={documents.length} trend="+12%" />
        <StatCard title="Active Users" value="342" trend="+8%" />
        <StatCard title="Queries Today" value="2,891" trend="+23%" />
        <StatCard title="Avg Response" value="1.2s" trend="-15%" negative />
      </div>

      {/* MAIN GRID */}
      <div className="dashboard-grid">

        {/* DOCUMENT LIBRARY */}
        <div className="card">
          <div className="card-header">
            <h2>Document Library</h2>

            <label className="upload-btn">
              Upload New
              <input type="file" hidden onChange={handleUpload} />
            </label>
          </div>

          <table className="doc-table">
            <thead>
              <tr>
                <th>Document</th>
                <th>Queries</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {documents.map(doc => (
                <tr key={doc.id}>
                  <td>{doc.name}</td>
                  <td>{doc.queries}</td>
                  <td>
                    <span className={`status ${doc.status}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="actions">
                    <button onClick={() => handleView(doc)}>👁</button>
                    <button onClick={() => handleDelete(doc.id)}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TOP QUERIES */}
        <div className="card">
          <h2>Top Queries</h2>

          <Query label="How to request time off?" value={234} tag="HR" />
          <Query label="Password reset process" value={189} tag="IT" />
          <Query label="Expense reimbursement policy" value={156} tag="Finance" />
          <Query label="Remote work guidelines" value={143} tag="HR" />
          <Query label="Health insurance details" value={128} tag="Benefits" />
        </div>
      </div>

      {/* KNOWLEDGE GRAPH */}
      <div className="card graph-card">
        <h2>Knowledge Graph</h2>
        <div className="graph-placeholder">
          Interactive knowledge graph visualization
        </div>
      </div>

    </div>
  );
}

/* SMALL COMPONENTS */

function StatCard({ title, value, trend, negative }) {
  return (
    <div className="stat-card">
      <div className={`trend ${negative ? "neg" : "pos"}`}>{trend}</div>
      <h3>{value}</h3>
      <p>{title}</p>
    </div>
  );
}

function Query({ label, value, tag }) {
  return (
    <div className="query">
      <span>{label}</span>
      <span className="tag">{tag}</span>
      <div className="bar">
        <div style={{ width: `${value / 3}%` }} />
      </div>
      <span className="value">{value}</span>
    </div>
  );
}
