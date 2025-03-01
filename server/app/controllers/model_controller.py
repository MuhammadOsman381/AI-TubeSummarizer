from flask import Blueprint, request, jsonify # type: ignore

model_bp = Blueprint("model", __name__)

@model_bp.route('/',methods=["GET"])
def hello_world():
    return jsonify("Hello from server!")    

@model_bp.route('/video-summerizer',methods=["POST"])
def get_summery_of_video():
    data = request.get_json()
    print(data['url'],data['prompt'])
    return jsonify("working well!",data)