from pydantic import BaseModel
from datetime import datetime 
from typing import Literal

class SensorEvent(BaseModel):
  side_id: str
  direction: Literal["IN", "OUT"]
  timestamp: datetime



