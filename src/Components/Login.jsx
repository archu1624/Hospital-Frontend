

// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import "./Login.css"; // Import CSS file

// function Login() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState("");
//   const [pass, setPass] = useState("");
//   const [error, setError] = useState("");

//   const login = (e) => {
//     e.preventDefault(); // prevent page reload
//     if (!user || !pass) {
//       setError("Please enter both username and password");
//       return;
//     }

//     if (user === "admin" && pass === "234") {
//       localStorage.setItem("loggedIn", "true");
//       localStorage.setItem("role", "admin");
//       navigate("/patient");
//     } else if (user === "user" && pass === "234") {
//       localStorage.setItem("loggedIn", "true");
//       localStorage.setItem("role", "user");
//       navigate("/appointment");
//     } else {
//       setError("Invalid username or password");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2> Hospital Login</h2>
//       <form onSubmit={login} className="login-form">
//         <input
//           type="text"
//           placeholder="Username"
//           value={user}
//           onChange={(e) => setUser(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={pass}
//           onChange={(e) => setPass(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>

//       {error && <p className="error-text">{error}</p>}

//       <p className="hint-text">
//         Hint: Use <b>admin / 234</b> or <b>user / 234</b>
//       </p>
//     </div>
//   );
// }

// export default Login;
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();

    if (!user || !pass) {
      setError("Please enter both username and password");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password: pass }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("role", data.role);

        if (data.role === "admin") {
          navigate("/patient");
        } else if (data.role === "user") {
          navigate("/appointment");
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="login-container">
      <h2>Hospital Login</h2>
      <form onSubmit={login} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default Login;

