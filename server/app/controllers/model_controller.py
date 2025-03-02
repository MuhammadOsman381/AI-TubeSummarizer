from flask import Blueprint, request, jsonify # type: ignore
from services.model_services import get_transcript,prompt_handler

model_bp = Blueprint("model", __name__)

@model_bp.route('/',methods=["GET"])
def hello_world():
    return jsonify("Hello from server!")    

@model_bp.route('/video-summerizer',methods=["POST"])
def get_summery_of_video():
    data = request.get_json()
    transcript = get_transcript(data['url'])
    response = prompt_handler(transcript)
    return jsonify("URL processesd succesfully!",response)