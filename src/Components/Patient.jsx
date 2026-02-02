// import { useState } from "react";
// import "./Patient.css"; // Import CSS file

// function PatientForm() {
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await fetch("http://localhost:5000/api/patients", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, age: Number(age), gender }),
//     });

//     const data = await response.json();
//     console.log("Saved:", data);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
//       <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
//       <input value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" />
//       <button type="submit">Add Patient</button>
//     </form>
//   );
// }

// export default PatientForm;
import { useState, useEffect } from "react";
import axios from "axios";
import "./Patient.css"; // optional styling

function Patient() {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  // ✅ Fetch patients from backend
  useEffect(() => {
    axios.get("http://localhost:8080/api/patients")
      .then(res => setPatients(res.data))
      .catch(err => console.error("Error fetching patients:", err));
  }, []);

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/patients", {
        name,
        age: Number(age),
        gender,
      });
      console.log("Saved:", response.data);

      // ✅ Update list immediately
      setPatients([...patients, response.data]);

      // ✅ Reset form
      setName("");
      setAge("");
      setGender("");
    } catch (err) {
      console.error("Error saving patient:", err);
    }
  };

  return (
    <div className="patient-container">
      <h2>Patients</h2>

      {/* ✅ Patient Form */}
      <form onSubmit={handleSubmit} className="patient-form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          type="number"
          required
        />
        <input
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          placeholder="Gender"
          required
        />
        <button type="submit">Add Patient</button>
      </form>

      {/* ✅ Patient List */}
      <ul className="patient-list">
        {patients.map((p) => (
          <li key={p.id}>
            {p.name} - {p.age} - {p.gender}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Patient;
