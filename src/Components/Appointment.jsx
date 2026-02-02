

// import { useState, useEffect } from "react";
// import "./Appointment.css"; // Import CSS file

// function Appointment() {
//   const [form, setForm] = useState({
//     patient: "",
//     doctor: "",
//     date: "",
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [queue, setQueue] = useState([]); // FIFO queue
//   const [slots] = useState([
//     "10:00 AM",
//     "11:00 AM",
//     "12:00 PM",
//     "02:00 PM",
//     "03:00 PM",
//   ]); // available slots
//   const [allocated, setAllocated] = useState([]); // allocated appointments
//   const [savedAppointments, setSavedAppointments] = useState([]); // from backend

//   // Load appointments from backend
//   useEffect(() => {
//     fetch("http://localhost:5000/api/appointments")
//       .then((res) => res.json())
//       .then((data) => setSavedAppointments(data))
//       .catch((err) => console.error("Error fetching appointments:", err));
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError("");
//     setSuccess("");
//   };

//   const bookAppointment = (e) => {
//     e.preventDefault();
//     if (!form.patient || !form.doctor || !form.date) {
//       setError("Please fill all fields before booking.");
//       return;
//     }

//     // Add patient request to queue
//     setQueue((prevQueue) => [...prevQueue, form]);
//     setForm({ patient: "", doctor: "", date: "" }); // reset form
//     setSuccess("Appointment request added to queue (FIFO).");
//   };

//   // Allocate slots in FIFO order and save to backend
//   const allocateSeats = () => {
//     const newAllocated = [];
//     let availableSlots = [...slots];

//     queue.forEach((req) => {
//       if (availableSlots.length > 0) {
//         const slot = availableSlots.shift();
//         const appointment = { ...req, slot };
//         newAllocated.push(appointment);

//         // Save to backend
//         fetch("http://localhost:5000/api/appointments", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(appointment),
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             setSavedAppointments((prev) => [...prev, data]);
//           })
//           .catch((err) => console.error("Error saving appointment:", err));
//       }
//     });

//     setAllocated([...allocated, ...newAllocated]);
//     setQueue([]);
//   };

//   return (
//     <div className="appointment-card">
//       <h3>Book Appointment</h3>
//       <form onSubmit={bookAppointment} className="appointment-form">
//         <input
//           name="patient"
//           placeholder="Patient Name"
//           value={form.patient}
//           onChange={handleChange}
//         />
//         <input
//           name="doctor"
//           placeholder="Doctor Name"
//           value={form.doctor}
//           onChange={handleChange}
//         />
//         <input
//           type="date"
//           name="date"
//           value={form.date}
//           onChange={handleChange}
//         />
//         <button type="submit">Book</button>
//       </form>

//       {error && <p className="error-text">{error}</p>}
//       {success && <p className="success-text">{success}</p>}

//       <h4>Pending Queue (FIFO)</h4>
//       <ul>
//         {queue.map((q, index) => (
//           <li key={index}>
//             {q.patient} - Dr. {q.doctor} on {q.date}
//           </li>
//         ))}
//       </ul>

//       <button onClick={allocateSeats} disabled={queue.length === 0}>
//         Allocate Seats (FIFO)
//       </button>

//       <h4>Allocated Appointments (Frontend)</h4>
//       <table className="appointment-table">
//         <thead>
//           <tr>
//             <th>Patient</th>
//             <th>Doctor</th>
//             <th>Date</th>
//             <th>Slot</th>
//           </tr>
//         </thead>
//         <tbody>
//           {allocated.map((a, index) => (
//             <tr key={index}>
//               <td>{a.patient}</td>
//               <td>{a.doctor}</td>
//               <td>{a.date}</td>
//               <td>{a.slot}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h4>Saved Appointments (From Backend)</h4>
//       <table className="appointment-table">
//         <thead>
//           <tr>
//             <th>Patient</th>
//             <th>Doctor</th>
//             <th>Date</th>
//             <th>Slot</th>
//           </tr>
//         </thead>
//         <tbody>
//           {savedAppointments.map((a) => (
//             <tr key={a.id}>
//               <td>{a.patient}</td>
//               <td>{a.doctor}</td>
//               <td>{a.date}</td>
//               <td>{a.slot}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Appointment;
import { useState, useEffect } from "react";
import "./Appointment.css";

function Appointment() {
  const [form, setForm] = useState({ patient: "", doctor: "", date: "" });
  const [queue, setQueue] = useState([]);
  const [slots] = useState(["10:00 AM","11:00 AM","12:00 PM","02:00 PM","03:00 PM"]);
  const [allocated, setAllocated] = useState([]);
  const [savedAppointments, setSavedAppointments] = useState([]);

  // Load appointments from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/appointments")
      .then((res) => res.json())
      .then((data) => setSavedAppointments(data))
      .catch((err) => console.error("Error fetching appointments:", err));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const bookAppointment = (e) => {
    e.preventDefault();
    if (!form.patient || !form.doctor || !form.date) return;
    setQueue([...queue, form]);
    setForm({ patient: "", doctor: "", date: "" });
  };

  const allocateSeats = () => {
    let availableSlots = [...slots];
    const newAllocated = [];

    queue.forEach(req => {
      if (availableSlots.length > 0) {
        const slot = availableSlots.shift();
        const appointment = { ...req, slot };
        newAllocated.push(appointment);

        // Save to backend
        fetch("http://localhost:8080/api/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(appointment),
        })
          .then((res) => res.json())
          .then((data) => setSavedAppointments(prev => [...prev, data]))
          .catch((err) => console.error("Error saving appointment:", err));
      }
    });

    setAllocated([...allocated, ...newAllocated]);
    setQueue([]);
  };

  return (
    <div className="appointment-card">
      <h3>Book Appointment</h3>
      <form onSubmit={bookAppointment} className="appointment-form">
        <input name="patient" value={form.patient} onChange={handleChange} placeholder="Patient Name" />
        <input name="doctor" value={form.doctor} onChange={handleChange} placeholder="Doctor Name" />
        <input type="date" name="date" value={form.date} onChange={handleChange} />
        <button type="submit">Book</button>
      </form>

      <h4>Pending Queue (FIFO)</h4>
      <ul>
        {queue.map((q, i) => <li key={i}>{q.patient} - Dr. {q.doctor} on {q.date}</li>)}
      </ul>

      <button onClick={allocateSeats} disabled={queue.length === 0}>Allocate Seats</button>

      <h4>Allocated Appointments (Frontend)</h4>
      <table>
        <thead><tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Slot</th></tr></thead>
        <tbody>
          {allocated.map((a, i) => (
            <tr key={i}><td>{a.patient}</td><td>{a.doctor}</td><td>{a.date}</td><td>{a.slot}</td></tr>
          ))}
        </tbody>
      </table>

      <h4>Saved Appointments (Backend)</h4>
      <table>
        <thead><tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Slot</th></tr></thead>
        <tbody>
          {savedAppointments.map(a => (
            <tr key={a.id}><td>{a.patient}</td><td>{a.doctor}</td><td>{a.date}</td><td>{a.slot}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Appointment;
