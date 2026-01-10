// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import "./AdminLoginModal.css";

// const ADMIN_EMAIL = "admin@opsmindai.com";
// const ADMIN_PASSWORD = "opsmind";

// export default function AdminLoginModal({ onClose, onVerifySuccess }) {
//   const { switchRole } = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const verifyAdmin = () => {
//     if (email !== ADMIN_EMAIL) {
//       setError("Invalid admin email");
//       return;
//     }

//     if (password !== ADMIN_PASSWORD) {
//       setError("Invalid admin password");
//       return;
//     }

//     switchRole("admin");
//     onVerifySuccess();
//   };

//   return (
//     <div className="admin-overlay">
//       <div className="admin-modal">
//         <h2>Admin Login</h2>

//         <input
//           type="email"
//           placeholder="Admin Email"
//           value={email}
//           onChange={(e) => {
//             setEmail(e.target.value);
//             setError("");
//           }}
//         />

//         <input
//           type="password"
//           placeholder="Admin Password"
//           value={password}
//           onChange={(e) => {
//             setPassword(e.target.value);
//             setError("");
//           }}
//         />

//         {error && <p className="error">{error}</p>}

//         <div className="actions">
//           <button className="cancel" onClick={onClose}>
//             Cancel
//           </button>
//           <button className="verify" onClick={verifyAdmin}>
//             Verify
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
