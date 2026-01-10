// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   // ✅ DEFINE LOGIN
//   const login = (userData) => {
//     setUser(userData); // { email, role }
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   const switchRole = (role) => {
//     setUser((prev) => ({ ...prev, role }));
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, switchRole }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData); // { email, role }
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role) => {
    setUser((prev) => ({ ...prev, role }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
