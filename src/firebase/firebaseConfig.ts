import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCl7QkGoYV--CCak2oyT2TQrV63oAOO8iQ",
  authDomain: "expense-tracker-30f0c.firebaseapp.com",
  projectId: "expense-tracker-30f0c",
  storageBucket: "expense-tracker-30f0c.appspot.com", // ✅ Fixed
  messagingSenderId: "204002980483",
  appId: "1:204002980483:web:ec9f11ea5f8bd12b18e1b6",
  measurementId: "G-18PH3NK79G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
