


// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function AdminRoute({ children }) {
//   const { user } = useAuth();
//   const location = useLocation();

//   if (!user) {
//     return <Navigate to="/signin" replace />;
//   }

//   if (user.role !== "admin") {
//     return <Navigate to="/chat" replace />;
//   }

//   return children;
// }

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

