from datetime import datetime
from fastapi import APIRouter

from app.database.supabaseClient import getSupabase
from app.models.temperature import TemperatureReading

router = APIRouter()
supabase = getSupabase()


@router.post("/temperature")
def receive_temperature(data: TemperatureReading):
    """
    Receives temperature data from the Raspberry Pi and stores it in Supabase.
    """

    # Ensure timestamp exists
    if data.timestamp is None:
        data.timestamp = datetime.utcnow()

    try:
        supabase.table("camera").insert(
            {
                "name": data.name,
                "temperature": data.temperature,
                "updated_at": data.timestamp.isoformat(),
            }
        ).execute()

        return {"status": "success"}

    except Exception as e:
        return {"error": str(e)}
