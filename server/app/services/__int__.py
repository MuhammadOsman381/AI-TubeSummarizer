from flask import Flask  # type: ignore

app = Flask(__name__)

from . import model_services