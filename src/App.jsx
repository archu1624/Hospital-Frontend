import { Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Patient from "./components/Patient.jsx";
import Doctor from "./components/Doctor.jsx";
import Appointment from "./components/Appointment.jsx";
import MedicalRecord from "./components/MedicalRecord.jsx";
import Billing from "./components/Billing.jsx";

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />

      {/* Protected Routes for Admin */}
      <Route
        path="/patient"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Navbar />
            <Patient />
          </ProtectedRoute>
        }
      />

      <Route
        path="/billing"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Navbar />
            <Billing />
          </ProtectedRoute>
        }
      />

      <Route
        path="/medical"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Navbar />
            <MedicalRecord />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes for User */}
      <Route
        path="/doctor"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <Navbar />
            <Doctor />
          </ProtectedRoute>
        }
      />

      <Route
        path="/appointment"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <Navbar />
            <Appointment />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
