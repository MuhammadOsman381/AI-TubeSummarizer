from flask import  Flask, request, jsonify # type: ignore
from controllers.model_controller import model_bp

app = Flask(__name__)

app.register_blueprint(model_bp)

if __name__ == '__main__':
    app.run(debug=True)
