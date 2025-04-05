"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // Import router

export default function LandingPage() {
  const router = useRouter(); // Initialize router

  return (
    <div className="bg-gradient-to-br from-black to-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-opacity-80 shadow-md border-b-1 border-amber-600">
        <h1 className="text-2xl font-bold">BudgetBuddy💰📊</h1>
        <div className="space-x-6">
          <a href="#features" className="hover:text-green-600">
            Features
          </a>
          <a href="#testimonials" className="hover:text-green-600">
            Testimonials
          </a>
          <a href="#get-started" className="hover:text-green-600">
            Get Started
          </a>
          <button
            className="bg-green-600 px-4 py-2 rounded-lg"
            onClick={() => router.push("/auth")} // Navigate to Login/Sign Up page
          >
            Login / Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-32">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold"
        >
          Take Control of Your Finances!
        </motion.h2>
        <p className="text-gray-300 mt-4 text-lg">
          Track your expenses, plan budgets, and make smarter financial
          decisions.
        </p>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-10 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          {
            title: "Track Expenses",
            desc: "Manage your finances with ease using our smart tracking tools.",
          },
          {
            title: "AI Insights",
            desc: "Get AI-powered suggestions to optimize your spending.",
          },
          {
            title: "Budget Planning",
            desc: "Plan your budget effectively with our intuitive tools.",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-gray-800 p-6 rounded-xl text-center"
          >
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-400 mt-2">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 text-center">
        <h2 className="text-3xl font-bold">What Our Users Say</h2>
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {[
            "This tool changed the way I handle my budget!",
            "AI insights helped me save more than I expected.",
            "Expense tracking has never been this easy!",
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-800 p-6 rounded-lg max-w-sm"
            >
              <p className="text-gray-300">"{testimonial}"</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Get Started Section */}
      <section id="get-started" className="py-20 text-center">
        <h2 className="text-3xl font-bold">Ready to Take Charge?</h2>
        <p className="text-gray-400 mt-4">
          Sign up today and start tracking your expenses effortlessly.
        </p>
        <button
          className="mt-6 bg-green-600 px-6 py-3 rounded-lg text-white text-lg"
          onClick={() => router.push("/auth")} // Navigate to sign-up page
        >
          Get Started
        </button>
      </section>
    </div>
  );
}
