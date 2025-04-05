"use client";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="p-10 bg-gray-800 rounded-lg shadow-lg text-center w-96">
        <h2 className="text-3xl font-bold text-white mb-4">
          Welcome to <span className="text-blue-400">BudgetBuddy</span>
        </h2>
        <p className="text-gray-400 mb-6">Track expenses and save smartly.</p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => router.push("/auth/signup")}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition transform hover:scale-105"
          >
            Sign Up
          </button>
          <button
            onClick={() => router.push("/auth/login")}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition transform hover:scale-105"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
