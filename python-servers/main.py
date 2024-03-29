from src.routes import get_chat
from flask_cors import CORS
from flask import Flask, request
import json

app = Flask(__name__)
CORS(app)


@app.route('/chatbot')
def chatbot():
    question = request.args.get('question')
    question = question.replace("+", " ")
    result = get_chat(question)
    return result
    
if __name__ == "__main__":
    app.run(port = 4000)