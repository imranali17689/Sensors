from datetime import datetime
from fastapi import APIRouter, HTTPException

from app.database.supabaseClient import getSupabase
from app.models.temperature import TemperatureReading

router = APIRouter()
supabase = getSupabase()


@router.post("/temperature")
def receive_temperature(data: TemperatureReading):
    """
    Receives temperature data from the Raspberry Pi and stores it in Supabase.
    """
    if data.timestamp is None:
        data.timestamp = datetime.utcnow()

    try:
        supabase.table("camera").insert({
            "name": data.name,
            "temperature": data.temperature,
            "updated_at": data.timestamp.isoformat(),
        }).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"status": "success"}
