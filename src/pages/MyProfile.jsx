import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/config";

import Navbar from "../components/Navbar";

function MyProfile() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [profile, setProfile] =
    useState({
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
    });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const docRef = doc(
        db,
        "users",
        user.uid
      );

      const snapshot =
        await getDoc(docRef);

      if (snapshot.exists()) {
        setProfile(snapshot.data());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {

    const cleanedPhone =
  profile.phoneNumber.replace(
    /\D/g,
    ""
  );

if (
  cleanedPhone.length !== 10 ||
  !/^[6-9]/.test(cleanedPhone)
) {
  toast.error(
    "Enter a valid mobile number"
  );
  return;
}

const formattedPhone =
  `+91${cleanedPhone}`;

    try {
      setSaving(true);

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

      const duplicateUser =
        phoneSnapshot.docs.find(
          (doc) =>
            doc.id !== user.uid
        );

      if (duplicateUser) {
        toast.error(
          "Mobile number already exists"
        );
        return;
      }
      console.log(formattedPhone);
      await updateDoc(
        doc(
          db,
          "users",
          user.uid
        ),
        {
          name: profile.name,
          phoneNumber:
  formattedPhone,
          address:
            profile.address || "",
        }
      );

      toast.success(
        "Profile Updated"
      );
    } catch (error) {
      console.log(error);
      toast.error(
        "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold mb-6">
            My Profile
          </h2>

          <input
            type="text"
            value={profile.name}
            onChange={(e) =>
              setProfile({
                ...profile,
                name:
                  e.target.value,
              })
            }
            placeholder="Name"
            className="w-full border p-3 rounded-xl mb-4"
          />

          <input
            type="email"
            value={profile.email}
            disabled
            className="w-full border p-3 rounded-xl mb-4 bg-gray-100"
          />

          <input
            type="tel"
            value={
              profile.phoneNumber
            }
            onChange={(e) =>
              setProfile({
                ...profile,
                phoneNumber:
                  e.target.value,
              })
            }
            placeholder="Mobile Number"
            className="w-full border p-3 rounded-xl mb-4"
          />

          <textarea
            value={
              profile.address || ""
            }
            onChange={(e) =>
              setProfile({
                ...profile,
                address:
                  e.target.value,
              })
            }
            placeholder="Address"
            rows="4"
            className="w-full border p-3 rounded-xl mb-4"
          />

          <button
            onClick={saveProfile}
            disabled={saving}
            className="w-full bg-orange-500 text-white p-3 rounded-xl"
          >
            {saving
              ? "Saving..."
              : "Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;