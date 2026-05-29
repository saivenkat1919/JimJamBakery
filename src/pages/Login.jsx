import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // TEMP LOGIN
    if (username === "owner" && password === "1234") {
      localStorage.setItem(
        "user",
        JSON.stringify({
          role: "owner",
          username,
        })
      );

      navigate("/owner");
    } else {
      localStorage.setItem(
        "user",
        JSON.stringify({
          role: "customer",
          username,
        })
      );

      navigate("/customer");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          JimJamBakery
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-3 rounded-lg mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;