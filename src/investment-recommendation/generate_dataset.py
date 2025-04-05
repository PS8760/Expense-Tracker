import pandas as pd

data = {
    "GDP_Growth": [3.1, 2.8, 3.5, 3.0, 2.6, 3.2, 3.3, 2.9, 2.7, 3.4],
    "CPI": [2.5, 2.2, 2.7, 2.4, 2.1, 2.6, 2.7, 2.3, 2.0, 2.8],
    "Interest_Rate": [1.75, 1.65, 1.90, 1.80, 1.60, 1.85, 1.90, 1.70, 1.50, 1.95],
    "Unemployment_Rate": [5.0, 5.2, 4.8, 5.1, 5.4, 4.9, 4.7, 5.3, 5.5, 4.6],
    "Inflation_Rate": [2.2, 2.0, 2.5, 2.1, 1.9, 2.3, 2.4, 2.0, 1.8, 2.6],
}

df = pd.DataFrame(data)
df.to_csv("synthetic_inflation_dataset.csv", index=False)
print("CSV file generated successfully.")
