import { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();

    const form = new FormData();
    form.append("username", username);
    form.append("password", password);

    try {
      const res = await api.post("/login", form);

      localStorage.setItem("token", res.data.access_token);

      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      }
    }

    setIsSubmitting(false);
  };

  return (
    <div className="container">
      <h1>Login</h1>

      {error && <p>{error}</p>}

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

        <button disabled={isSubmitting}>Login</button>
      </form>

      <Link to="/register">Register</Link>
    </div>
  );
}
