def recommend_strategy(predicted_inflation: float) -> dict:
    if predicted_inflation < 2:
        strategy = {
            "where": "Stock Market, Real Estate",
            "why": "Low inflation allows higher returns from equities and property appreciation.",
            "how": "Invest via index funds or REITs",
            "when": "Now is a good time to invest while inflation is low."
        }
    elif 2 <= predicted_inflation < 4:
        strategy = {
            "where": "Balanced Portfolio (Stocks + Bonds)",
            "why": "Moderate inflation indicates a stable economic environment.",
            "how": "Diversify using mutual funds or robo-advisors",
            "when": "Consider dollar-cost averaging over the next few months."
        }
    else:
        strategy = {
            "where": "Commodities, Inflation-protected securities (TIPS)",
            "why": "High inflation erodes cash and fixed-income returns.",
            "how": "Use ETFs for commodities or government-issued TIPS",
            "when": "Act soon to protect capital from inflation."
        }

    return strategy
