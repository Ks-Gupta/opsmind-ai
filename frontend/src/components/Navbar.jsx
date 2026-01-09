// import { NavLink } from "react-router-dom";
// import { useEffect, useState } from "react";


// import "./Navbar.css";
// import robot from "../assets/robot.png";

// export default function Navbar() {
//   const [theme, setTheme] = useState("light");

//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(prev => (prev === "light" ? "dark" : "light"));
//   };


//   return (
//     <nav className="navbar">
      
//       {/* LEFT */}
//      <div className="nav-logo">
//         <img src={robot} alt="Robot" className="nav-icon" />
//         <span>OPSMIND AI</span>
//       </div>

//       {/* CENTER */}
//       <div className="nav-center">
//         <a href="#">Features</a>
//         <a href="#">Demo</a>
//       </div> 

//       {/* RIGHT */}
//       <div className="nav-right">
//         <button className="theme-toggle" onClick={toggleTheme}>
//           {theme === "light" ? "🌙" : "☀️"}
//         </button>

//         <a href="#" className="signin">Sign In</a>
//         <button className="cta-btn">Get Started</button>
//       </div>
//     </nav>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import robot from "../assets/robot.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const scrollTo = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-logo" onClick={() => navigate("/")}>
        <img src={robot} alt="Robot" className="nav-icon" />
        <span>OPSMIND AI</span>
      </div>

      {/* CENTER */}
      <div className="nav-center">
        <button onClick={() => scrollTo("features")} >Features</button>
        <button onClick={() => scrollTo("demo")}>Demo</button>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>

                <button className="signin" onClick={() => navigate("/signin")}>
        Sign In
        </button>

        <button className="cta-btn" onClick={() => navigate("/signup")}>
        Get Started
        </button>



      </div>
    </nav>
  );
}

