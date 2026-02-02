// // // function Navbar() {
// // //     return (
// // //       <div className="navbar">
// // //         <h2>Hospital Management System</h2>
// // //       </div>
// // //     );
// // //   }

// // //   export default Navbar;
// // import { Link } from "react-router-dom";

// // function Navbar() {
// //   return (
// //     <div className="navbar">
// //       <Link to="/patient">Patient</Link>
// //       <Link to="/doctor">Doctor</Link>
// //       <Link to="/appointment">Appointment</Link>
// //       <Link to="/medical">Medical</Link>
// //       <Link to="/billing">Billing</Link>
// //     </div>
// //   );
// // }

// // export default Navbar;


// import { Link, useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   return (
//     <div className="navbar">
//       <div className="nav-links">
//         <Link to="/patient">Patient</Link>
//         <Link to="/doctor">Doctor</Link>
//         <Link to="/appointment">Appointment</Link>
//         <Link to="/medical">Medical</Link>
//         <Link to="/billing">Billing</Link>
//       </div>

//       <button className="logout-btn" onClick={logout}>
//         Logout
//       </button>
//     </div>
//   );
// }

// export default Navbar;

// import { Link, useNavigate } from "react-router-dom";
// import "./Navbar.css"; // Import CSS file

// function Navbar() {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   return (
//     <div className="navbar">
//       <h2 className="nav-title"> Hospital Management System</h2>
//       <div className="nav-links">
//         <Link to="/patient">Patient</Link>
//         <Link to="/doctor">Doctor</Link>
//         <Link to="/appointment">Appointment</Link>
//         <Link to="/medical">Medical</Link>
//         <Link to="/billing">Billing</Link>
//       </div>
//       <button className="logout-btn" onClick={logout}>
//         Logout
//       </button>
//     </div>
//   );
// }

// export default Navbar;
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const role = (localStorage.getItem("role") || "").toLowerCase(); // normalize

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2 className="nav-title">Hospital Management System</h2>
      <div className="nav-links">
        {role === "admin" && (
          <>
            <Link to="/patient">Patient</Link>
            <Link to="/billing">Billing</Link>
            <Link to="/medical">Medical Record</Link>
          </>
        )}
        {role === "user" && (
          <>
            <Link to="/appointment">Appointment</Link>
            <Link to="/doctor">Doctor</Link>
          </>
        )}
      </div>
      {(role === "admin" || role === "user") && (
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      )}
    </div>
  );
}

export default Navbar;

