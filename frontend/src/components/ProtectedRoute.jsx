
// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedRoute({ children }) {
//   const { user } = useAuth();
//   const location = useLocation();

//   if (!user) {
//     return (
//       <Navigate
//         to="/signin"
//         state={{ from: location.pathname }}
//         replace
//       />
//     );
//   }

//   return children;
// }

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  const location = useLocation();

  // ❌ Not logged in
  if (!user) {
    return (
      <Navigate
        to="/signin"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // ❌ Logged in but role not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // ✅ Allowed
  return children;
}
