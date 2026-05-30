import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase/config";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [phoneNumber, setPhoneNumber] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error(
        "Passwords do not match"
      );
      return;
    }

    const cleanedPhone =
      phoneNumber.replace(/\D/g, "");

    if (
      cleanedPhone.length !== 10 ||
      !/^[6-9]/.test(cleanedPhone)
    ) {
      toast.error(
        "Enter a valid 10-digit mobile number"
      );
      return;
    }

    const formattedPhone =
      `+91${cleanedPhone}`;

    try {
      setLoading(true);

      // CHECK DUPLICATE PHONE NUMBER

      const phoneQuery = query(
        collection(db, "users"),
        where(
          "phoneNumber",
          "==",
          formattedPhone
        )
      );

      const phoneSnapshot =
        await getDocs(phoneQuery);

      if (!phoneSnapshot.empty) {
        toast.error(
          "Mobile number already registered"
        );
        setLoading(false);
        return;
      }

      // CREATE AUTH ACCOUNT

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user =
        userCredential.user;

      // CREATE FIRESTORE PROFILE

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          name: name.trim(),
          email:
            email.trim().toLowerCase(),
          phoneNumber:
            formattedPhone,
          role: "customer",
          authProvider: "email",
          address: "",
          createdAt:
            serverTimestamp(),
        }
      );

      toast.success(
        "Account created successfully"
      );

      navigate("/");
    } catch (error) {
      console.log(error);

      if (
        error.code ===
        "auth/email-already-in-use"
      ) {
        toast.error(
          "Email already registered"
        );
      } else {
        toast.error(
          "Signup failed"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSignup}
        className="bg-white w-full max-w-md rounded-3xl shadow-xl p-6 md:p-10"
      >
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full border p-3 rounded-xl mb-4"
          required
        />

        <input
          type="tel"
          inputMode="numeric"
          maxLength={10}
          placeholder="Mobile Number"
          value={phoneNumber}
          onChange={(e) =>
            setPhoneNumber(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-xl mb-4"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 rounded-xl mb-4"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-xl mb-4"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-xl mb-6"
          required
        />

        <button
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-xl font-semibold transition"
        >
          {loading
            ? "Creating Account..."
            : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default Signup;