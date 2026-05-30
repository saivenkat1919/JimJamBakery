import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";


import {
  auth,
  db,
} from "../firebase/config";

import {
  signInWithPopup,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  googleProvider,
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
      const userDoc = await getDoc(
  doc(
    db,
    "users",
    firebaseUser.uid
  )
);

if (!userDoc.exists()) {
  toast.error(
    "User profile not found"
  );
  return;
}

const userData =
  userDoc.data();

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
        toast.success("Login successful");
        navigate("/owner");
      } else {
        toast.success("Login successful");
        navigate("/customer");
      }
    } catch (error) {
      console.log(error);

      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin =
  async () => {
    try {
      setLoading(true);

      const result =
        await signInWithPopup(
          auth,
          googleProvider
        );

      const user =
        result.user;

      const userRef = doc(
        db,
        "users",
        user.uid
      );

      const userDoc =
        await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name:
            user.displayName || "",
          email:
            user.email || "",
          phoneNumber: "",
          role: "customer",
          authProvider:
            "google",
          createdAt:
            serverTimestamp(),
        });
      }

      const profile =
        (
          await getDoc(userRef)
        ).data();

      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          role: profile.role,
          name: profile.name,
        })
      );

      toast.success(
        "Google Login Successful"
      );

      navigate("/customer");
    } catch (error) {
      console.log(error);

      toast.error(
        "Google Login Failed"
      );
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
          Baked Happiness, One Click Away
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

      <div className="text-center mt-6">
  <p className="text-gray-600">
    New Customer?
  </p>

  <Link
    to="/signup"
    className="text-orange-500 font-semibold"
  >
    Create Account
  </Link>
</div>

<div className="my-6 flex items-center">
  <div className="flex-1 border-t"></div>

  <span className="px-3 text-gray-500">
    OR
  </span>

  <div className="flex-1 border-t"></div>
</div>

<button
  type="button"
  onClick={handleGoogleLogin}
  className="w-full border border-gray-300 bg-white p-3 rounded-xl font-semibold hover:bg-gray-50"
>
  Continue with Google
</button>

      <button
        disabled={loading}
        className="w-full bg-orange-500 hover:bg-orange-600 transition text-white p-3 rounded-xl font-semibold"
      >
        {loading ? (
  <span className="flex justify-center items-center gap-2">
    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
    Logging in...
  </span>
) : (
  "Login"
)}
      </button>
    </form>
  </div>
);
}

export default Login;