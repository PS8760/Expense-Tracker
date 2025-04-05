"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h2>

        {/* Input Fields */}
        <form className="flex flex-col">
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 my-2 bg-gray-700 rounded-md text-white focus:outline-none"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="p-3 my-2 bg-gray-700 rounded-md text-white focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 my-2 bg-gray-700 rounded-md text-white focus:outline-none"
          />

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 p-3 rounded-md mt-4 font-semibold"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Toggle Between Login & Sign Up */}
        <p className="text-center mt-4 text-gray-400">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-green-400 ml-1 hover:underline"
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
