from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class TemperatureReading(BaseModel):
    name: str
    temperature: float
    timestamp: Optional[datetime] = None
