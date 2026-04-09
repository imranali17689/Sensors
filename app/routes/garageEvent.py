from datetime import datetime

from fastapi import APIRouter

from app.database.supabaseClient import getSupabase
from app.models.sensorEvent import SensorEvent
from app.services.garageService import getGrandStudentParking
from app.services.garageService import updateGrandStudentParking

router = APIRouter()

supabase = getSupabase()


@router.get("/status")
def callStatus():
    return getGrandStudentParking()


@router.post("/event")
def recievesEvent(event: SensorEvent):
    if event.timestamp is None:
        event.timestamp = datetime.utcnow()

    supabase.table("Events").insert(
        {
            "side_id": event.side_id,
            "direction": event.direction,
            "timestamp": event.timestamp.isoformat(),
        }
    ).execute()

    return updateGrandStudentParking(event.direction)


@router.get("/garage-status/grand/student")
def read_grand_student_status():
    return getGrandStudentParking()
