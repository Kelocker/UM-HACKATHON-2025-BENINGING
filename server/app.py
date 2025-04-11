from flask import Flask, request, jsonify
from flask_cors import CORS
import json

# Import your logic modules
from chatbot.intent_handler import get_intent_output



# Setup Flask
app = Flask(__name__)
CORS(app)

# === Routes ===

@app.route("/api")
def hello():
    return jsonify(message="Hello from Flask!")


@app.route("/api/intent", methods=["POST"])
def handle_intent():
    user_input = request.json.get("input")

    with open('userdata/user.json', 'r') as f:
        user_info = json.load(f)
    current_merchant_id = user_info["merchant_id"]

    result = get_intent_output(user_input, current_merchant_id)
    return jsonify(result)


# Start server
if __name__ == "__main__":
    app.run(debug=True)
