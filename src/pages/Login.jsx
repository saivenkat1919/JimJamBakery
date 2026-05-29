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
  <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
    <form
      onSubmit={handleLogin}
      className="bg-white w-full max-w-md rounded-3xl shadow-xl p-6 md:p-10"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-orange-500">
          JimJamBakery
        </h1>

        <p className="text-gray-500 mt-2">
          Fresh Bakery Ordering System
        </p>
      </div>

      <input
        type="email"
        placeholder="Email"
        className="w-full border border-gray-300 p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border border-gray-300 p-3 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-orange-400"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        disabled={loading}
        className="w-full bg-orange-500 hover:bg-orange-600 transition text-white p-3 rounded-xl font-semibold"
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