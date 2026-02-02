import { useState, useEffect } from "react";
import "./MedicalRecord.css";

function MedicalRecord() {
  const [form, setForm] = useState({
    patient: "",
    diagnosis: "",
    treatment: "",
    date: "",
  });
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load existing records from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/records")
      .then((res) => res.json())
      .then((data) => setRecords(data))
      .catch((err) => console.error("Error fetching records:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.patient || !form.diagnosis || !form.treatment || !form.date) {
      setError("Please fill all fields before saving.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setRecords([...records, data]);
        setForm({ patient: "", diagnosis: "", treatment: "", date: "" });
        setSuccess("Record saved successfully!");
      } else {
        setError(data.message || "Failed to save record.");
      }
    } catch (err) {
      console.error("Error saving record:", err);
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="record-card">
      <h3>Medical Records</h3>
      <form onSubmit={handleSubmit} className="record-form">
        <input
          name="patient"
          value={form.patient}
          onChange={handleChange}
          placeholder="Patient Name"
        />
        <input
          name="diagnosis"
          value={form.diagnosis}
          onChange={handleChange}
          placeholder="Diagnosis"
        />
        <input
          name="treatment"
          value={form.treatment}
          onChange={handleChange}
          placeholder="Treatment"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
        <button type="submit">Add Record</button>
      </form>

      {error && <p className="error-text">{error}</p>}
      {success && <p className="success-text">{success}</p>}

      <h4>Records List</h4>
      <table className="record-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Diagnosis</th>
            <th>Treatment</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.patient}</td>
              <td>{r.diagnosis}</td>
              <td>{r.treatment}</td>
              <td>{r.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MedicalRecord;
