"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#1E2938] to-gray-900 backdrop-blur-md">
      <div className="bg-[#1E2938]/90 p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Welcome Back to <span className="text-green-500">BudgetBuddy</span>
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 rounded-lg bg-[#1E2938] text-white border border-b-green-600 placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-400 transition"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-b-green-600 placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            type="submit"
            className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold transition"
          >
            Log In
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
          type="button"
          className="w-full flex items-center justify-center gap-2 py-2 border border-gray-600 rounded-lg text-white hover:bg-gray-700 transition"
          onClick={() => alert("Google Auth Coming Soon")}
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Don&apos;t have an account?{" "}
          <span
            className="text-green-400 hover:underline cursor-pointer"
            onClick={() => router.push("/auth/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
