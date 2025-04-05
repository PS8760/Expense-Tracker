"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-6">
      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 text-center">
        Welcome to the Expense Tracker
      </h1>

      <p className="text-white text-center max-w-xl mb-10 text-lg sm:text-xl">
        Track your expenses, visualize your spending, and get AI-powered investment 
        recommendations based on inflation prediction. Get insights like &quot;Inflation predictions&quot;, 
        &quot;Investment strategies&quot;, and more.
      </p>

      <Link href="/signup">
        <button
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={`px-8 py-4 text-lg rounded-lg transition-colors duration-300 font-semibold ${
            isHovering
              ? "bg-purple-700 text-white"
              : "bg-white text-purple-700"
          }`}
        >
          Get Started
        </button>
      </Link>
    </main>
  );
}
