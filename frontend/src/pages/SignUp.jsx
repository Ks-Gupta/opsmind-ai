// // import { useState } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";
// // import "./Auth.css";

// // export default function SignIn() {
// //   const { login } = useAuth();
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   // where to go after login
// //   const redirectTo = location.state?.from || "/chat";

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     if (!email || !password) {
// //       alert("Please fill all fields");
// //       return;
// //     }

// //     // ✅ TEMP LOGIN (later replace with API)
// //     login({ email });

// //     // ✅ redirect correctly
// //     navigate(redirectTo);
// //   };

// //   return (
// //     <div className="auth-page">
// //       <div className="auth-card">
// //         <h2>Sign In</h2>
// //         <p>Welcome back to OpsMind AI</p>

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

// //           <button className="auth-btn" type="submit">
// //             Sign In
// //           </button>
// //         </form>

// //         <div className="auth-switch">
// //           Don’t have an account?{" "}
// //           <span onClick={() => navigate("/signup")}>Sign Up</span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import "./Auth.css";
// import robot from "../assets/robot.png";

// export default function SignUp() {
//   return (
//     <div className="auth-page">
//       <div className="auth-card">
//         <div className="auth-logo">
//           <img src={robot} alt="OpsMind AI" />
//           <span>OpsMindAI</span>
//         </div>

//         <div className="auth-role-toggle">
//           <button className="role-btn">👤 User</button>
//           <button className="role-btn active">🛡 Admin</button>
//         </div>

//         <div className="role-status">
//           <span>🛡 Signing In As Admin</span>
//         </div>

//         <h2 className="auth-title">Create Account</h2>
//         <p className="auth-subtitle">Join OpsMind AI today</p>

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

//         <div className="auth-group">
//           <label>Confirm Password</label>
//           <div className="auth-input">
//             <input type="password" placeholder="••••••••" />
//           </div>
//         </div>

//         <button className="auth-btn">Create Account</button>

//         <p className="auth-footer">
//           Already have an account? <a href="/signin">Sign In</a>
//         </p>
//       </div>
//     </div>
//   );
// }
