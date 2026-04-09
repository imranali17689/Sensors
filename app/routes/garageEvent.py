from fastapi import APIRouter
from app.models.sensorEvent import SensorEvent
from app.state.counterStore import applyEvent
from app.state.counterStore import getStatus
from app.database.supabaseClient import getSupabase
from app.services.garageService import getGrandStudentParking
from datetime import datetime

router = APIRouter()

supabase = getSupabase()

@router.get("/status")
def callStatus():
  return getGrandStudentParking()

@router.post("/event")
def recievesEvent(event: SensorEvent):
  supabase = getSupabase()

  if event.object_type == "car":
    supabase.table("Events").insert({
      "object_type": event.object_type,
      "direction": event.direction,
      "confidence": event.confidence,
      "track_id": event.track_id,
      "timestamp": event.timestamp.isoformat()
    }).execute()

  applyEvent(event)
  status = getStatus()

  supabase.table("garage_status").update({
    "occupied": status["occupied"],
    "available": status["available"],
    "capacity": status["capacity"]
  }).eq("id", 1).execute()

  return status

@router.get("/garage-status/grand/student")
def read_grand_student_status():
  return getGrandStudentParking()