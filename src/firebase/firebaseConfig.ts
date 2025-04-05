// firebase/firebaseConfig.ts (or lib/firebase.ts)
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl7QkGoYV--CCak2oyT2TQrV63oAOO8iQ",
  authDomain: "expense-tracker-30f0c.firebaseapp.com",
  projectId: "expense-tracker-30f0c",
  storageBucket: "expense-tracker-30f0c.appspot.com", // fixed typo: was firebasestorage.app
  messagingSenderId: "204002980483",
  appId: "1:204002980483:web:ec9f11ea5f8bd12b18e1b6",
  measurementId: "G-18PH3NK79G",
};

// Only initialize Firebase once
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// Optional: Initialize analytics only on the client
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) getAnalytics(app);
  });
}

// Export services
export { auth, db };
