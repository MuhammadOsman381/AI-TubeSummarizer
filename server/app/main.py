from flask import  Flask, request, jsonify # type: ignore
from controllers.model_controller import model_bp
from flask_cors import CORS # type: ignore

app = Flask(__name__)
CORS(app)
app.register_blueprint(model_bp)

if __name__ == '__main__':
    app.run(debug=True)
