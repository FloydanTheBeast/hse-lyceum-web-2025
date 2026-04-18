import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api.ts";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await api.post("/register", {
      username,
      password,
    });

    localStorage.setItem("token", res.data.access_token);

    navigate("/");
  };

  return (
    <div className="container">
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Register</button>
      </form>

      <Link to="/login">Login</Link>
    </div>
  );
}
