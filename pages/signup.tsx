"use client";
import { useState } from "react";
import { auth } from "../src/firebase/firebaseConfig";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed up:", userCredential.user);
    } catch (error: any) {
      console.error("Signup error:", error.message); // Debugging the actual error
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-white text-2xl mb-4">Signup</h2>
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded-lg w-full mb-2 bg-gray-700 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded-lg w-full mb-2 bg-gray-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded-lg">
          Sign Up
        </button>
      </div>
    </div>
  );
}
