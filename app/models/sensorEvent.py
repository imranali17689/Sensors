from pydantic import BaseModel
from datetime import datetime 
from typing import Literal, Optional

class SensorEvent(BaseModel):
  object_type: Literal["car", "golf_car", "person"]
  direction: Literal["IN", "OUT"]
  confidence: float
  timestamp: datetime
  track_id: Optional[str] = None


