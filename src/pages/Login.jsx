import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/config";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const q = query(
        collection(db, "users"),
        where("username", "==", username)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        alert("User not found");
        return;
      }

      const userData = snapshot.docs[0].data();

      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      if (userData.role === "owner") {
        navigate("/owner");
      } else {
        navigate("/customer");
      }
    } catch (error) {
      console.log(error);
      alert("Login failed");
    } finally {
      setLoading(false);
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

        <button
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;