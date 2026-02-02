// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children }) {
//   const isLoggedIn = localStorage.getItem("loggedIn");

//   if (!isLoggedIn) {
//     return <Navigate to="/" />;
//   }

//   return children;
// }

// export default ProtectedRoute;
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("loggedIn");

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
