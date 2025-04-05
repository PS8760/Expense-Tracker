import pandas as pd
import numpy as np

def generate_synthetic_data(rows=500):
    np.random.seed(42)
    gdp_growth = np.random.normal(2, 1, rows)
    interest_rate = np.random.normal(3, 0.5, rows)
    cpi = np.random.normal(2.5, 0.3, rows)
    unemployment_rate = np.random.normal(5, 1, rows)

    inflation_rate = 0.4 * cpi + 0.2 * interest_rate - 0.1 * gdp_growth + 0.3 * unemployment_rate + np.random.normal(0, 0.2, rows)

    df = pd.DataFrame({
        "gdp_growth": gdp_growth,
        "interest_rate": interest_rate,
        "cpi": cpi,
        "unemployment_rate": unemployment_rate,
        "inflation_rate": inflation_rate
    })

    df.to_csv("src/investment-recommendation/synthetic_inflation_dataset.csv", index=False)
    print("Synthetic dataset generated.")

if __name__ == "__main__":
    generate_synthetic_data()
