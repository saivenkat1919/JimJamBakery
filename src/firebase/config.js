import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY87e3rMn_OG0c46lODpxbrEVdJPJiWVg",
  authDomain: "jimjambakery.firebaseapp.com",
  projectId: "jimjambakery",
  storageBucket: "jimjambakery.firebasestorage.app",
  messagingSenderId: "854853747845",
  appId: "1:854853747845:web:dea12bef7aa125603d95ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);