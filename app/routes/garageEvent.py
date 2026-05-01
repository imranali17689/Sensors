from datetime import datetime

from fastapi import APIRouter

from app.database.supabaseClient import getSupabase
from app.models.sensorEvent import SensorEvent
from app.services.garageService import getGrandStudentParking
from app.services.garageService import updateGrandStudentParking

router = APIRouter()

supabase = getSupabase()


def _grand_student_from_db():
    """
    Single source for Grand student occupancy JSON.

    Reads the Grand + student row from Supabase `garage_status` (same query as
    service layer). Both GET /status and GET /garage-status/grand/student must
    call this so the frontend and any clients stay in sync.
    """
    return getGrandStudentParking()


@router.get("/status")
def callStatus():
    return _grand_student_from_db()


@router.post("/event")
def recievesEvent(event: SensorEvent):
    if event.timestamp is None:
        event.timestamp = datetime.utcnow()

    supabase.table("Events").insert(
        {
            "direction": event.direction,
            "timestamp": event.timestamp.isoformat(),
        }
    ).execute()

    return updateGrandStudentParking(event.direction)


@router.get("/garage-status/grand/student")
def read_grand_student_status():
    return _grand_student_from_db()
