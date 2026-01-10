// import { useEffect, useState } from "react";
// import "./AdminDashboard.css";

// import {
//   getStats,
//   getDocuments,
//   deleteDocument,
//   uploadDocument,
//   viewDocument,
//   getCharts
// } from "../Services/adminApi.js";

// import {
//   LineChart, Line, XAxis, YAxis, Tooltip,
//   PieChart, Pie, Cell, ResponsiveContainer
// } from "recharts";




// export default function AdminDashboard() {
//   const [stats, setStats] = useState(null);
//   const [documents, setDocuments] = useState([]);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploading, setUploading] = useState(false);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [charts, setCharts] = useState(null);
  



//   /* 🔌 LOAD REAL BACKEND DATA */
//   const loadDashboard = async () => {
//   const statsData = await getStats();
//   const docsData = await getDocuments();
//   const chartData = await getCharts();

//   setStats(statsData);
//   setDocuments(docsData);
//   setCharts(chartData);
// };


//     useEffect(() => {
//       const fetchData = async () => {
//         await loadDashboard();
//       };
//       fetchData();
//     }, []);


//   /* 🗑 DELETE DOCUMENT */
//   const handleDelete = async (filename) => {
//     if (!window.confirm("Delete this document?")) return;
//     await deleteDocument(filename);
//     loadDashboard();
//   };

//   return (
//     <div className="admin-dashboard">

//       {/* HEADER */}
//       <h1 className="page-title">
//         Manage your knowledge base and monitor usage analytics
//       </h1>

//       {/* STATS */}
//       {stats && (
//         <div className="stats-grid">
//           <StatCard title="Total Documents" value={stats.totalDocuments} trend="+12%" />
//           <StatCard title="Active Users" value={stats.activeUsers} trend="+8%" />
//           <StatCard title="Queries Today" value={stats.queriesToday} trend="+23%" />
//           <StatCard title="Avg Response" value={stats.avgResponse} trend="-15%" negative />
//         </div>
//       )}

//       {/* MAIN GRID */}
//       <div className="dashboard-grid">

//         {/* DOCUMENT LIBRARY */}
//         <div className="card">
//           <div className="card-header">
//             <h2>Document Library</h2>
//             <label className="upload-btn">
//               Upload New
//                <input
//                 type="file"
//                 hidden
//                 onChange={async (e) => {
//                   const file = e.target.files[0];
//                   if (!file) return;

//                   setUploading(true);
//                   setUploadProgress(0);

//                   try {
//                     await uploadDocument(file, setUploadProgress);
//                     await loadDashboard();
//                   } catch {
//                     alert("Upload failed");
//                   } finally {
//                     setUploading(false);
//                     setUploadProgress(0);
//                   }
//                 }}
//               />

//               {uploading && (
//                   <div className="upload-progress">
//                     <div style={{ width: `${uploadProgress}%` }} />
//                   </div>
//                 )}



//             </label>
//           </div>
//           <div className="doc-filters">
//           <input
//             placeholder="Search documents..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <select value={filter} onChange={(e) => setFilter(e.target.value)}>
//             <option value="all">All</option>
//             <option value="indexed">Indexed</option>
//             <option value="processing">Processing</option>
//           </select>
//         </div>


//           <table className="doc-table">
//             <thead>
//               <tr>
//                 <th>Document</th>
//                 <th>Queries</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {documents
//                 .filter(doc =>
//                   doc.name.toLowerCase().includes(search.toLowerCase())
//                 )
//                 .filter(doc =>
//                   filter === "all" ? true : doc.status === filter
//                 )

//               .map((doc) => (
//                 <tr key={doc.name}>
//                   <td>{doc.name}</td>
//                   <td>{doc.queries}</td>
//                   <td>
//                     <span className={`status ${doc.status}`}>
//                       {doc.status}
//                     </span>
//                   </td>
//                   <td className="actions">
//                   <button
//                     title="View"
//                     onClick={() => viewDocument(doc.name)}
//                   >
//                     👁
//                   </button>

//                   <button
//                     title="Delete"
//                     onClick={() => handleDelete(doc.name)}
//                   >
//                     🗑
//                   </button>
//                 </td>

//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* TOP QUERIES */}
//         <div className="card">
//           <h2>Top Queries</h2>
//           <Query label="How to request time off?" value={234} tag="HR" />
//           <Query label="Password reset process" value={189} tag="IT" />
//           <Query label="Expense reimbursement policy" value={156} tag="Finance" />
//           <Query label="Remote work guidelines" value={143} tag="HR" />
//           <Query label="Health insurance details" value={128} tag="Benefits" />
//         </div>
//       </div>

//       {charts && (
//   <div className="dashboard-grid">

//     {/* 📈 QUERIES OVER TIME */}
//     <div className="card">
//       <h2>Queries Over Time</h2>
//       <ResponsiveContainer width="100%" height={260}>
//         <LineChart data={charts.queriesOverTime}>
//           <XAxis dataKey="day" />
//           <YAxis />
//           <Tooltip />
//           <Line
//             type="monotone"
//             dataKey="queries"
//             stroke="#2563eb"
//             strokeWidth={3}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>

//     {/* 🧩 DOCUMENT STATUS */}
//           <div className="card">
//             <h2>Document Status</h2>
//             <ResponsiveContainer width="100%" height={260}>
//               <PieChart>
//                 <Pie
//                   data={charts.documentStatus}
//                   dataKey="value"
//                   nameKey="name"
//                   innerRadius={60}
//                   outerRadius={90}
//                 >
//                   <Cell fill="#22c55e" />
//                   <Cell fill="#facc15" />
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//         </div>
//       )}


//       {/* KNOWLEDGE GRAPH */}
//       <div className="card graph-card">
//         <h2>Knowledge Graph</h2>
//         <div className="graph-placeholder">
//           Interactive knowledge graph visualization
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= COMPONENTS ================= */

// function StatCard({ title, value, trend, negative }) {
//   return (
//     <div className="stat-card">
//       <div className={`trend ${negative ? "neg" : "pos"}`}>
//         {trend}
//       </div>
//       <h3>{value}</h3>
//       <p>{title}</p>
//     </div>
//   );
// }

// function Query({ label, value, tag }) {
//   return (
//     <div className="query">
//       <span>{label}</span>
//       <span className="tag">{tag}</span>
//       <div className="bar">
//         <div style={{ width: `${value / 3}%` }} />
//       </div>
//       <span className="value">{value}</span>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import "./AdminDashboard.css";

import {
  getStats,
  getDocuments,
  deleteDocument,
  uploadDocument,
  viewDocument,
  getCharts
} from "../Services/adminApi.js";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [charts, setCharts] = useState(null);

  const [loadingDocs, setLoadingDocs] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  /* 🔌 LOAD DASHBOARD DATA */
  const loadDashboard = async () => {
    try {
      setLoadingDocs(true);

      const [statsData, docsData, chartData] = await Promise.all([
        getStats(),
        getDocuments(),
        getCharts()
      ]);

      setStats(statsData);
      setDocuments(docsData);
      setCharts(chartData);
    } catch (err) {
      console.error("Dashboard load failed:", err);
    } finally {
      setLoadingDocs(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  /* 🗑 DELETE DOCUMENT */
  const handleDelete = async (filename) => {
    if (!window.confirm("Delete this document?")) return;
    await deleteDocument(filename);
    loadDashboard();
  };

  return (
    <div className="admin-dashboard">

      {/* HEADER */}
      <h1 className="page-title">
        Manage your knowledge base and monitor usage analytics
      </h1>

      {/* STATS */}
      {stats && (
        <div className="stats-grid">
          <StatCard title="Total Documents" value={stats.totalDocuments} trend="+12%" />
          <StatCard title="Active Users" value={stats.activeUsers} trend="+8%" />
          <StatCard title="Queries Today" value={stats.queriesToday} trend="+23%" />
          <StatCard title="Avg Response" value={stats.avgResponse} trend="-15%" negative />
        </div>
      )}

      {/* MAIN GRID */}
      <div className="dashboard-grid">

        {/* DOCUMENT LIBRARY */}
        <div className="card">
          <div className="card-header">
            <h2>Document Library</h2>

            <label className="upload-btn">
              Upload New
              <input
                type="file"
                hidden
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  setUploading(true);
                  setUploadProgress(0);

                  try {
                    await uploadDocument(file, setUploadProgress);
                    await loadDashboard();
                  } catch (err) {
                     alert(err);
                    // alert("Upload failed");
                  } finally {
                    setUploading(false);
                    setUploadProgress(0);
                  }
                }}
              />
            </label>
          </div>

          {uploading && (
            <div className="upload-progress">
              <div style={{ width: `${uploadProgress}%` }} />
            </div>
          )}

          {/* SEARCH + FILTER */}
          <div className="doc-filters">
            <input
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="indexed">Indexed</option>
              <option value="processing">Processing</option>
            </select>
          </div>

          {/* DOCUMENT TABLE */}
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
              {loadingDocs ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: 20 }}>
                    Loading documents...
                  </td>
                </tr>
              ) : documents.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: 20 }}>
                    No documents found
                  </td>
                </tr>
              ) : (
                documents
                  .filter(doc =>
                    doc.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .filter(doc =>
                    filter === "all" ? true : doc.status === filter
                  )
                  .map((doc) => (
                    <tr key={doc.name}>
                      <td>{doc.name}</td>
                      <td>{doc.queries}</td>
                      <td>
                        <span className={`status ${doc.status}`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="actions">
                        <button onClick={() => viewDocument(doc.name)}>👁</button>
                        <button onClick={() => handleDelete(doc.name)}>🗑</button>
                      </td>
                    </tr>
                  ))
              )}
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

      {/* ================= KNOWLEDGE GRAPH ================= */}
      <div className="card graph-card">
        <h2>Knowledge Graph</h2>

        <div className="graph-placeholder">
          <div className="graph-placeholder-content">
            <div className="graph-placeholder-title">
              Knowledge Graph Visualization
            </div>
            <div className="graph-placeholder-sub">
              Entity relationships will appear here once documents are indexed.
            </div>
          </div>
        </div>
      </div>

      {/* ================= CHARTS ================= */}
      {charts && (
        <div className="dashboard-grid">

          <div className="card">
            <h2>Queries Over Time</h2>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={charts.queriesOverTime}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="queries"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h2>Document Status</h2>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={charts.documentStatus}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                >
                  <Cell fill="#22c55e" />
                  <Cell fill="#facc15" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>
      )}
    </div>
  );
}

/* ================= COMPONENTS ================= */

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
