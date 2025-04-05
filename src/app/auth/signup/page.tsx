"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // or wherever post-signup
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#1E2938] to-gray-900 backdrop-blur-md">
      <div className="bg-[#1E2938]/90 p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Create Your <span className="text-green-500">BudgetBuddy</span>{" "}
          Account
        </h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 rounded-lg bg-[#1E2938] text-white border border-b-green-600 placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-400 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-b-green-600 placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold transition"
          >
            Sign Up
          </button>
        </form>

        {error && (
          <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
        )}

        <div className="my-6 flex items-center justify-center">
          <div className="h-px w-1/3 bg-gray-600" />
          <span className="mx-3 text-gray-400">or</span>
          <div className="h-px w-1/3 bg-gray-600" />
        </div>

        <button
          className="w-full flex items-center justify-center gap-2 py-2 border border-gray-600 rounded-lg text-white hover:bg-gray-700 transition"
          onClick={() => alert("Google Auth Coming Soon")}
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Already have an account?{" "}
          <span
            className="text-green-400 hover:underline cursor-pointer"
            onClick={() => router.push("/auth/login")}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}
