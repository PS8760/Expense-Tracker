from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the trained model
model = joblib.load("inflation_model.pkl")

@app.route('/')
def index():
    return "🔥 Investment Recommendation API is running. Use the `/predict` endpoint."

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    
    try:
        features = np.array([
            data['GDP_Growth'],
            data['CPI'],
            data['Interest_Rate'],
            data['Unemployment_Rate']
        ]).reshape(1, -1)

        predicted_inflation = model.predict(features)[0]

        recommendation = ""
        if predicted_inflation > 3.0:
            recommendation = "Invest in inflation-protected assets like TIPS or commodities."
        elif predicted_inflation < 2.0:
            recommendation = "Invest in stocks and long-term bonds."
        else:
            recommendation = "Diversify your investments."

        return jsonify({
            "predicted_inflation": round(float(predicted_inflation), 2),
            "recommendation": recommendation
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5001)
