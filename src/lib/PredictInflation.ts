export async function predictInflation(data: {
  GDP_Growth: number;
  CPI: number;
  Interest_Rate: number;
  Unemployment_Rate: number;
}) {
  const response = await fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to get prediction from backend");
  }

  return response.json();
}
