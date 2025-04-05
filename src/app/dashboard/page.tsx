"use client";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { auth, db } from "@/firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { predictInflation } from "@/lib/PredictInflation";

interface Expense {
  category: string;
  amount: number;
}

const sampleSuggestions = [
  {
    title: "Consider Short-Term Bonds",
    description:
      "With moderate inflation predicted, short-term bonds can offer stability and protect your capital.",
    reasoning:
      "They are less sensitive to interest rate hikes often used to combat inflation.",
  },
  {
    title: "Explore Inflation-Protected Securities",
    description:
      "Treasury Inflation-Protected Securities (TIPS) are designed to keep pace with inflation.",
    reasoning:
      "Their principal is adjusted based on changes in the Consumer Price Index (CPI).",
  },
  {
    title: "Diversify with Commodities",
    description:
      "Certain commodities, like precious metals and energy, can act as a hedge against inflation.",
    reasoning:
      "Their prices often rise when the cost of goods and services increases.",
  },
];

export default function Dashboard() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isEarning, setIsEarning] = useState<boolean | null>(null);
  const [salaryInput, setSalaryInput] = useState<string>("");
  const [salary, setSalary] = useState<number | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<number | null>(null);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        await loadUserData(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadUserData = async (uid: string) => {
    try {
      const userRef = doc(db, "users", uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.salary) setSalary(data.salary);
        if (data.expenses) setExpenses(data.expenses);
        setIsEarning(true);
      } else {
        await setDoc(userRef, { salary: null, expenses: [] });
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load user data.");
    }
  };

  const handleSalaryConfirm = async () => {
    const parsed = Number(salaryInput);
    if (isNaN(parsed) || parsed <= 0) {
      setError("Please enter a valid salary amount.");
      return;
    }

    try {
      setSalary(parsed);
      if (userId) {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
          salary: parsed,
        });
      }
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to update salary.");
    }
  };

  const addExpense = async () => {
    if (!category || amount === null || amount <= 0) {
      setError("Please fill in a valid category and amount.");
      return;
    }

    try {
      const updatedExpenses = [...expenses, { category, amount }];
      setExpenses(updatedExpenses);
      setCategory("");
      setAmount(null);
      if (userId) {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, { expenses: updatedExpenses });
      }
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to add expense.");
    }
  };

  const deleteExpense = async (indexToDelete: number) => {
    const updatedExpenses = expenses.filter((_, index) => index !== indexToDelete);
    setExpenses(updatedExpenses);
    if (userId) {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { expenses: updatedExpenses });
    }
  };

  const handlePredict = async () => {
    setIsLoading(true);
    setShowSuggestions(false);
    try {
      const predictionResult = await predictInflation({
        GDP_Growth: 3.0,
        CPI: 2.5,
        Interest_Rate: 1.8,
        Unemployment_Rate: 5.0,
      });

      setRecommendation(
        predictionResult?.recommendation || "Moderate Inflation Predicted"
      );
      setShowSuggestions(true);
    } catch (err) {
      console.error(err);
      setRecommendation("Prediction failed. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    window.location.href = "/auth";
  };

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const savings = salary ? salary - totalExpenses : null;

  return (
    <Layout>
      <div className="p-4 text-white">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {error && <div className="text-red-400 mb-4">{error}</div>}

        {isEarning === null ? (
          <div className="text-center mt-12">
            <h2 className="text-xl mb-6">Are you currently earning?</h2>
            <button
              className="bg-green-600 px-6 py-3 rounded mr-4"
              onClick={() => setIsEarning(true)}
            >
              Yes
            </button>
            <button
              className="bg-red-600 px-6 py-3 rounded"
              onClick={() => setIsEarning(false)}
            >
              No
            </button>
          </div>
        ) : isEarning === true && salary === null ? (
          <div className="mt-6">
            <h2 className="text-xl mb-4">Enter your salary</h2>
            <input
              type="number"
              className="p-2 bg-gray-800 border rounded text-white mr-4"
              placeholder="e.g. 5000"
              value={salaryInput}
              onChange={(e) => setSalaryInput(e.target.value)}
            />
            <button
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleSalaryConfirm}
            >
              Confirm
            </button>
          </div>
        ) : (
          <>
            <div className="mt-4 flex flex-col md:flex-row gap-6">
              <div className="w-full max-w-md bg-gray-800 p-4 rounded">
                <h2 className="text-lg font-semibold mb-4">Add Expense</h2>
                <input
                  type="text"
                  placeholder="Category"
                  className="w-full mb-2 p-2 rounded bg-gray-700 text-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Amount"
                  className="w-full mb-2 p-2 rounded bg-gray-700 text-white"
                  value={amount || ""}
                  onChange={(e) =>
                    setAmount(e.target.value ? Number(e.target.value) : null)
                  }
                />
                <button
                  className="w-full bg-blue-500 p-2 rounded hover:bg-blue-600"
                  onClick={addExpense}
                >
                  Add Expense
                </button>
              </div>

              <div className="w-full max-w-md bg-gray-800 p-4 rounded">
                <h2 className="text-lg font-semibold mb-4">Transactions</h2>
                {expenses.length === 0 ? (
                  <p className="text-gray-400">No expenses yet.</p>
                ) : (
                  expenses.map((txn, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 bg-gray-700 rounded mb-2"
                    >
                      <div>
                        {txn.category} - ${txn.amount.toFixed(2)}
                      </div>
                      <button
                        className="text-red-400 hover:text-red-600"
                        onClick={() => deleteExpense(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
                {savings !== null && (
                  <div className="text-green-400 mt-4 font-semibold">
                    Savings: ${savings.toFixed(2)}
                  </div>
                )}
              </div>
            </div>

            {expenses.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl mb-4">Expense Breakdown</h2>
                <div className="bg-gray-800 p-4 rounded">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={expenses}>
                      <XAxis dataKey="category" stroke="white" />
                      <YAxis stroke="white" tickFormatter={(v) => `$${v}`} />
                      <Tooltip
                        cursor={{ fill: "#333" }}
                        formatter={(v) => `$${v}`}
                      />
                      <Bar dataKey="amount" fill="#82ca9d">
                        <LabelList
                          dataKey="amount"
                          position="top"
                          formatter={(v) => `$${v}`}
                          fill="white"
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            <div className="mt-10 text-center">
              <button
                className="bg-purple-600 px-6 py-3 rounded hover:bg-purple-700"
                onClick={handlePredict}
                disabled={isLoading}
              >
                {isLoading ? "Predicting..." : "Predict Investment"}
              </button>

              {!isLoading && showSuggestions && recommendation && (
                <div className="mt-6 bg-gray-900 p-4 rounded">
                  <h3 className="text-lg font-semibold mb-2">
                    Inflation Forecast:
                  </h3>
                  <p className="text-yellow-300 mb-4">{recommendation}</p>
                  <h4 className="font-semibold mb-2">Recommendations:</h4>
                  {sampleSuggestions.map((s, i) => (
                    <div
                      key={i}
                      className="bg-gray-800 p-4 mb-3 rounded text-left"
                    >
                      <h5 className="text-blue-300 font-medium">{s.title}</h5>
                      <p className="text-gray-300">{s.description}</p>
                      <p className="text-sm italic text-gray-500">
                        {s.reasoning}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
