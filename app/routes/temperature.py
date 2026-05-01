from flask import Blueprint, request, jsonify
from supabase import create_client
import os

temperature_bp = Blueprint("temperature", __name__)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

@temperature_bp.route("/temperature", methods=["POST"])
def receive_temperature():
    data = request.json

    name = data.get("name")
    temp = data.get("temperature")
    timestamp = data.get("timestamp")

    if not name or temp is None:
        return jsonify({"error": "Missing data"}), 400

    try:
        supabase.table("camera").insert({
            "name": name,
            "temperature": temp,
            "updated_at": timestamp
        }).execute()

        return jsonify({"status": "success"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
