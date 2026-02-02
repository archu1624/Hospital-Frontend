
// import { useState, useEffect } from "react";
// import "./Billing.css";

// function Billing() {
//   const [form, setForm] = useState({ patient: "", amount: "", date: "" });
//   const [bills, setBills] = useState([]);

//   // Load existing bills from backend
//   useEffect(() => {
//     fetch("http://localhost:5000/api/billing")
//       .then((res) => res.json())
//       .then((data) => setBills(data))
//       .catch((err) => console.error("Error fetching bills:", err));
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch("http://localhost:5000/api/billing", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });
//     const data = await res.json();
//     setBills([...bills, data]);
//     setForm({ patient: "", amount: "", date: "" });
//   };

//   return (
//     <div className="billing-card">
//       <h3>Billing</h3>
//       <form onSubmit={handleSubmit} className="billing-form">
//         <input
//           name="patient"
//           value={form.patient}
//           onChange={handleChange}
//           placeholder="Patient Name"
//         />
//         <input
//           name="amount"
//           value={form.amount}
//           onChange={handleChange}
//           placeholder="Amount"
//         />
//         <input
//           type="date"
//           name="date"
//           value={form.date}
//           onChange={handleChange}
//         />
//         <button type="submit">Add Bill</button>
//       </form>

//       <h4>Billing Records</h4>
//       <table className="billing-table">
//         <thead>
//           <tr>
//             <th>Patient</th>
//             <th>Amount</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bills.map((b) => (
//             <tr key={b.id}>
//               <td>{b.patient}</td>
//               <td>₹{b.amount}</td>
//               <td>{b.date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Billing;


import { useState, useEffect } from "react";
import axios from "axios";
import "./Billing.css";

function Billing() {
  const [form, setForm] = useState({ patient: "", amount: "", date: "" });
  const [bills, setBills] = useState([]);

  // Load existing bills from backend
  useEffect(() => {
    axios.get("http://localhost:8080/api/billing")
      .then(res => setBills(res.data))
      .catch(err => console.error("Error fetching bills:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/billing", {
        patient: form.patient,
        amount: Number(form.amount),
        date: form.date,
      });
      setBills([...bills, res.data]);
      setForm({ patient: "", amount: "", date: "" });
    } catch (err) {
      console.error("Error saving bill:", err);
    }
  };

  return (
    <div className="billing-card">
      <h3>Billing</h3>
      <form onSubmit={handleSubmit} className="billing-form">
        <input
          name="patient"
          value={form.patient}
          onChange={handleChange}
          placeholder="Patient Name"
          required
        />
        <input
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          type="number"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Bill</button>
      </form>

      <h4>Billing Records</h4>
      <table className="billing-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((b) => (
            <tr key={b.id}>
              <td>{b.patient}</td>
              <td>₹{b.amount}</td>
              <td>{b.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Billing;
