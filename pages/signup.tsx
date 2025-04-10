"use client";
import { useState } from "react";
import { auth } from "../src/firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    setError(""); // Reset error
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed up:", userCredential.user);
      router.push("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred during signup.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-950">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-white text-2xl mb-4 text-center">Signup</h2>

        <input
          type="email"
          placeholder="Email"
          className="p-2 border border-gray-700 rounded-lg w-full mb-3 bg-gray-800 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="p-2 border border-gray-700 rounded-lg w-full mb-3 bg-gray-800 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition"
          onClick={handleSignup}
        >
          Sign Up
        </button>

        {error && <p className="text-red-400 text-sm mt-3 text-center">{error}</p>}
      </div>
    </div>
  );
}
