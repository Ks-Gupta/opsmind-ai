


// //admin@opsmind.ai

// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// import Home from "./pages/Home";
// import Chat from "./pages/Chat";
// import DemoChat from "./pages/DemoChat";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
// import Auth from "./pages/Auth";
// import Admin from "./pages/Admin";
// import ProtectedRoute from "./components/ProtectedRoute";
// import AdminRoute from "./components/AdminRoute";

// function App() {
//   return (
//     <>
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/demo" element={<DemoChat />} />
//         {/* <Route path="/signin" element={<SignIn />} />
//         <Route path="/signup" element={<SignUp />} /> */}

//         <Route path="/signin" element={<Auth />} />
//         <Route path="/signup" element={<Auth />} />


//         <Route
//           path="/chat"
//           element={
//             <ProtectedRoute>
//               <Chat />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin"
//           element={
//             <AdminRoute>
//               <Admin />
//             </AdminRoute>
//           }
//         />
//       </Routes>

//       <Footer />
//     </>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Chat from "./pages/Chat";
import DemoChat from "./pages/DemoChat";
import Auth from "./pages/Auth";
import Admin from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<DemoChat />} />

        {/* ✅ ONLY AUTH ROUTES */}
        <Route path="/signin" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
