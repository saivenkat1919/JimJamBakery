import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase/config";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // FIREBASE AUTH LOGIN
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const firebaseUser =
        userCredential.user;

      // FETCH ROLE FROM FIRESTORE
      const q = query(
        collection(db, "users"),
        where("email", "==", firebaseUser.email)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        alert("User role not found");
        return;
      }

      const userData =
        snapshot.docs[0].data();

      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          role: userData.role,
          name: userData.name,
        })
      );

      // REDIRECT BASED ON ROLE
      if (userData.role === "owner") {
        navigate("/owner");
      } else {
        navigate("/customer");
      }
    } catch (error) {
      console.log(error);

      alert("Invalid email or password");
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
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;