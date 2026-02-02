// function Doctor() {
//     const doctors = [
//       { id: 1, name: "Dr. Kumar", specialization: "Cardiology" },
//       { id: 2, name: "Dr. Priya", specialization: "Dermatology" },
//     ];
  
//     return (
//       <div className="card">
//         <h3>Doctors</h3>
//         <ul>
//           {doctors.map((doc) => (
//             <li key={doc.id}>
//               {doc.name} - {doc.specialization}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
  
//   export default Doctor;
import { useState } from "react";
import "./Doctor.css"; // Import CSS file

function Doctor() {
  const [search, setSearch] = useState("");
  const doctors = [
    { id: 1, name: "Dr. Kumar", specialization: "Cardiology" },
    { id: 2, name: "Dr. Priya", specialization: "Dermatology" },
    { id: 3, name: "Dr. Arjun", specialization: "Neurology" },
    { id: 4, name: "Dr. Meena", specialization: "Pediatrics" },
  ];

  // Filter doctors by search term
  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="doctor-card">
      <h3> Doctors Directory</h3>

      <input
        type="text"
        placeholder="Search by name or specialization..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <ul className="doctor-list">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doc) => (
            <li key={doc.id} className="doctor-item">
              <span className="doctor-name">{doc.name}</span>
              <span className="doctor-specialization">{doc.specialization}</span>
            </li>
          ))
        ) : (
          <p className="no-result">No doctors found</p>
        )}
      </ul>
    </div>
  );
}

export default Doctor;
