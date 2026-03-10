from fastapi import APIRouter
from app.models.sensorEvent import SensorEvent
from app.state.counterStore import applyEvent
from app.state.counterStore import getStatus
from app.database.supabaseClient import getSupabase


router = APIRouter()

supabase = getSupabase()

@router.get("/status")
def callStatus():
  return getStatus()

@router.post("/event")
def recievesEvent(event: SensorEvent):
  supabase.table("Events").insert({
    "side_id": event.side_id,
    "direction": event.direction,
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
