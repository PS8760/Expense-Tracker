import pandas as pd
import xgboost as xgb
import joblib
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

def train_model():
    # Load dataset from the same directory
    df = pd.read_csv("synthetic_inflation_dataset.csv")

    # Features and target
    X = df.drop(columns=["Inflation_Rate"])
    y = df["Inflation_Rate"]

    # Split into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Initialize and train XGBoost model
    model = xgb.XGBRegressor(objective="reg:squarederror", n_estimators=100)
    model.fit(X_train, y_train)

    # Evaluate model
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    print(f"Model trained. Mean Squared Error on test set: {mse:.4f}")

    # Save the model to file
    joblib.dump(model, "inflation_model.pkl")
    print("Model saved as inflation_model.pkl")

if __name__ == "__main__":
    train_model()
