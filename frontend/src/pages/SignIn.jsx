// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";
// // import "./Auth.css";

// // // export default function SignIn() {
// // //   const { login } = useAuth();
// // //   const navigate = useNavigate();
// // //   const location = useLocation();

// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");

// // //   // 🔑 redirect target (important)
// // //   const redirectTo = location.state?.from || "/chat";

// // //   const handleSubmit = (e) => {
// // //   e.preventDefault();

// // //   if (!email || !password) {
// // //     alert("Please fill all fields");
// // //     return;
// // //   }

// // //   // 🔐 TEMP ROLE LOGIC
// // //   const role = email.includes("admin") ? "admin" : "user";

// // //   login({ email, role });

// // //   navigate(redirectTo);
// // // };


// // //   return (
// // //     <div className="auth-page">
// // //       <div className="auth-card">
// // //         <h2>Sign In</h2>
// // //         <p>Welcome back to OpsMind AI</p>

// // //         <form onSubmit={handleSubmit}>
// // //           <input
// // //             type="email"
// // //             placeholder="Email"
// // //             value={email}
// // //             onChange={(e) => setEmail(e.target.value)}
// // //           />

// // //           <input
// // //             type="password"
// // //             placeholder="Password"
// // //             value={password}
// // //             onChange={(e) => setPassword(e.target.value)}
// // //           />

// // //           <button className="auth-btn" type="submit">
// // //             Sign In
// // //           </button>
// // //         </form>

// // //         <div className="auth-switch">
// // //           Don’t have an account?{" "}
// // //           <span onClick={() => navigate("/signup")}>Sign Up</span>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // export default function SignIn() {
// //   const { login } = useAuth();
// //   const navigate = useNavigate();
  

// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     if (!email || !password) {
// //       alert("Please fill all fields");
// //       return;
// //     }

// //     // 🔐 TEMP ROLE LOGIC
// //     const role = email.includes("admin") ? "admin" : "user";

// //     login({ email, role });

// //     // ✅ ROLE BASED REDIRECT
// //     if (role === "admin") {
// //       navigate("/admin", { replace: true });
// //     } else {
// //       navigate("/chat", { replace: true });
// //     }
// //   };

// //   return (
// //     <div className="auth-page">
// //       <div className="auth-card">
// //         <h2>Sign In</h2>

// //         <form onSubmit={handleSubmit}>
// //           <input
// //             type="email"
// //             placeholder="Email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //           />

// //           <input
// //             type="password"
// //             placeholder="Password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //           />

// //           <button className="auth-btn">Sign In</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }


// import "./Auth.css";
// import robot from "../assets/robot.png";

// export default function SignIn() {
//   return (
//     <div className="auth-page">
//       <div className="auth-card">
//         <div className="auth-logo">
//           <img src={robot} alt="OpsMind AI" />
//           <span>OpsMindAI</span>
//         </div>

//         <div className="auth-role-toggle">
//           <button className="role-btn active">👤 User</button>
//           <button className="role-btn">🛡 Admin</button>
//         </div>

//         <div className="role-status">
//           <span>👤 Signing In As User</span>
//         </div>

//         <h2 className="auth-title">Welcome Back</h2>
//         <p className="auth-subtitle">Sign in to continue</p>

//         <div className="auth-group">
//           <label>Email</label>
//           <div className="auth-input">
//             <input type="email" placeholder="you@company.com" />
//           </div>
//         </div>

//         <div className="auth-group">
//           <label>Password</label>
//           <div className="auth-input">
//             <input type="password" placeholder="••••••••" />
//           </div>
//         </div>

//         <button className="auth-btn">Sign In</button>

//         <p className="auth-footer">
//           Don’t have an account? <a href="/signup">Sign Up</a>
//         </p>
//       </div>
//     </div>
//   );
// }
