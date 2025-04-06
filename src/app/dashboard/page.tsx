"use client";
import { useEffect, useState } from "react";
import { auth, firestore } from "../../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [salary, setSalary] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState("");
  const [savings, setSavings] = useState(0);
  const [inflation, setInflation] = useState(null);
  const [recommendation, setRecommendation] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchExpenses(currentUser.uid);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchExpenses = async (uid) => {
    const q = query(collection(firestore, "expenses"), where("uid", "==", uid));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => doc.data());
    setExpenses(data);
    const totalSpent = data.reduce((acc, curr) => acc + Number(curr.amount), 0);
    setSavings(Number(salary) - totalSpent);
  };

  const handleAddExpense = async () => {
    if (!newExpense) return;
    const amount = parseFloat(newExpense);
    const expense = {
      uid: user.uid,
      amount,
      createdAt: new Date(),
    };
    await addDoc(collection(firestore, "expenses"), expense);
    setNewExpense("");
    fetchExpenses(user.uid);
  };

  const getInflationPrediction = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/inflation");
      setInflation(response.data.predicted_inflation);
      setRecommendation(response.data.recommendation);
    } catch (error) {
      console.error("Inflation fetch error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      <div className="text-center p-10 bg-gray-900 rounded-xl shadow-2xl backdrop-blur-sm ring-1 ring-white/10 transform transition duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold mb-4">Welcome to BudgetBuddy</h1>
        <p className="text-gray-400 mb-6">
          Your personal finance dashboard with smart recommendations
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Salary */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Monthly Salary</h2>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Enter your salary"
              className="w-full p-2 rounded text-black"
            />
          </div>

          {/* Expenses */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Add Expense</h2>
            <input
              type="number"
              value={newExpense}
              onChange={(e) => setNewExpense(e.target.value)}
              placeholder="Expense Amount"
              className="w-full p-2 rounded text-black mb-2"
            />
            <button
              onClick={handleAddExpense}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition"
            >
              Add
            </button>
          </div>

          {/* Savings */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Your Savings</h2>
            <p className="text-2xl text-green-400">${savings.toFixed(2)}</p>
          </div>

          {/* Inflation Prediction */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">
              AI Inflation Prediction
            </h2>
            <button
              onClick={getInflationPrediction}
              className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded transition mb-2"
            >
              Predict Inflation
            </button>
            {inflation !== null && (
              <div>
                <p className="text-lg">
                  Predicted Inflation:{" "}
                  <span className="text-yellow-400">{inflation}%</span>
                </p>
                <p className="mt-2 text-sm text-gray-300">{recommendation}</p>
              </div>
            )}
          </div>
        </div>

        {/* Expenses List */}
        <div className="mt-10 bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Expense History</h2>
          {expenses.length === 0 ? (
            <p className="text-gray-400">No expenses recorded yet.</p>
          ) : (
            <ul className="space-y-2">
              {expenses.map((exp, index) => (
                <li
                  key={index}
                  className="flex justify-between border-b border-gray-700 pb-2"
                >
                  <span>💸 ${exp.amount}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(
                      exp.createdAt.seconds * 1000
                    ).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
