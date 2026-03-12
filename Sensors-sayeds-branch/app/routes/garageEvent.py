from fastapi import APIRouter
from app.models.sensorEvent import SensorEvent
from app.state.counterStore import applyEvent
from app.state.counterStore import getStatus



router = APIRouter()

@router.get("/status")
def callStatus():
  return getStatus()

@router.post("/event")
def recievesEvent(event: SensorEvent):
  applyEvent(event)
  return getStatus()