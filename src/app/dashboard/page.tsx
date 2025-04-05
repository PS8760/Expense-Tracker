"use client";
import { useState, useEffect } from "react";
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
import { predictInflation } from "@/lib/PredictInflation"; // Assuming this exists

// Sample investment suggestions (replace with actual logic)
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

interface Expense {
  category: string;
  amount: number;
}

export default function Dashboard() {
  const [isEarning, setIsEarning] = useState<boolean | null>(null);
  const [salaryInput, setSalaryInput] = useState<string>("");
  const [salary, setSalary] = useState<number | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<number | null>(null);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addExpense = () => {
    if (category && amount !== null) {
      setExpenses([...expenses, { category, amount }]);
      setCategory("");
      setAmount(null);
    }
  };

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const savings = salary ? salary - totalExpenses : null;

  const handlePredict = async () => {
    setIsLoading(true);
    setShowSuggestions(false); // Reset suggestions on new prediction
    try {
      // Simulate prediction delay (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Replace this with your actual inflation prediction logic and API call
      const predictionResult = await predictInflation({
        GDP_Growth: 3.0,
        CPI: 2.5,
        Interest_Rate: 1.8,
        Unemployment_Rate: 5.0,
      });
      setRecommendation(
        predictionResult?.recommendation || "Moderate Inflation Predicted"
      );
      setShowSuggestions(true); // Show suggestions after successful prediction
    } catch (err) {
      console.error(err);
      setRecommendation("Something went wrong with prediction.");
      setShowSuggestions(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      {isEarning === null && (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center p-10 bg-gray-900 rounded-lg shadow-lg">
            <h2 className="text-5xl font-regular text-white mb-6">
              Are you earning?
            </h2>
            <div className="mt-4 flex justify-center gap-6">
              <button
                className="bg-green-500 text-white px-6 py-3 text-lg rounded-lg hover:bg-green-600 transition"
                onClick={() => setIsEarning(true)}
              >
                Yes
              </button>
              <button
                className="bg-red-500 text-white px-6 py-3 text-lg rounded-lg hover:bg-red-600 transition"
                onClick={() => setIsEarning(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {isEarning === true && salary === null && (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center p-10 bg-gray-900 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-6">
              Enter Your Monthly Salary
            </h2>
            <div className="flex space-x-4">
              <input
                type="number"
                placeholder="Enter salary amount"
                className="p-3 border rounded-lg text-white bg-gray-800"
                value={salaryInput}
                onChange={(e) => setSalaryInput(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
                onClick={() => setSalary(Number(salaryInput))}
              >
                Confirm Salary
              </button>
            </div>
          </div>
        </div>
      )}

      {(isEarning === false || (isEarning === true && salary !== null)) && (
        <div className="mt-6 flex flex-wrap justify-center items-start gap-16">
          <h1 className="text-4xl font-bold text-center text-white w-full">
            Welcome to Your Dashboard
          </h1>

          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-semibold text-center text-white">
              Enter Your Expenses
            </h2>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Expense category (e.g. Rent, Food)"
                className="w-full p-2 border rounded-lg text-white bg-gray-700 mb-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <input
                type="number"
                placeholder="Amount"
                className="w-full p-2 border rounded-lg text-white bg-gray-700 mb-2"
                value={amount || ""}
                onChange={(e) =>
                  setAmount(e.target.value ? Number(e.target.value) : null)
                }
              />
              <button
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={addExpense}
              >
                Add Expense
              </button>
            </div>
          </div>

          {expenses.length > 0 && (
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Your Recent Transactions
              </h2>
              <div className="space-y-4">
                {expenses.map((txn, index) => (
                  <div
                    key={index}
                    className="flex justify-between p-4 bg-gray-700 rounded-lg text-white"
                  >
                    <span>{txn.category}</span>
                    <span className="text-red-400">
                      - ${txn.amount?.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              {savings !== null && (
                <div className="mt-4 text-center text-lg font-semibold text-green-400">
                  Savings: ${savings.toFixed(2)}
                </div>
              )}

              <div className="mt-6 text-center">
                <button
                  className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition"
                  onClick={handlePredict}
                  disabled={isLoading}
                >
                  {isLoading ? "Predicting..." : "Predict Investment"}
                </button>
              </div>

              {isLoading && (
                <div className="mt-4 text-center text-white">
                  <p className="text-lg font-medium">Predicting...</p>
                </div>
              )}

              {!isLoading && showSuggestions && recommendation && (
                <div className="mt-4 text-center text-white">
                  <p className="text-lg font-medium">Inflation Prediction:</p>
                  <p className="mt-1 text-yellow-300">{recommendation}</p>

                  <h3 className="text-xl font-semibold mt-6 mb-2">
                    Investment Suggestions Based on Prediction:
                  </h3>
                  {sampleSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="bg-gray-700 rounded-lg p-4 mb-3"
                    >
                      <h4 className="font-semibold text-lg text-blue-300">
                        {suggestion.title}
                      </h4>
                      <p className="text-gray-400">{suggestion.description}</p>
                      <p className="text-sm italic text-gray-500 mt-1">
                        Reasoning: {suggestion.reasoning}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {expenses.length > 0 && (
        <div className="mt-12 w-full max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-center text-white mb-4">
            Expense Breakdown
          </h2>
          <div className="bg-gray-800 p-6 rounded-lg">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={expenses}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="category" stroke="white" />
                <YAxis stroke="white" tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  cursor={{ fill: "#333" }}
                  formatter={(value) => `$${value}`}
                />
                <Bar dataKey="amount" fill="#82ca9d">
                  <LabelList
                    dataKey="amount"
                    position="top"
                    formatter={(value) => `$${value}`}
                    fill="white"
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </Layout>
  );
}
