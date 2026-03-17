from fastapi import APIRouter
from app.models.sensorEvent import SensorEvent
from app.state.counterStore import applyEvent
from app.state.counterStore import getStatus
from app.services.garageService import getGrandStudentParking
from app.services.garageService import updateGrandStudentParking



router = APIRouter()

@router.get("/status")
def callStatus():
  return getStatus()

@router.post("/event")
def recievesEvent(event: SensorEvent):
  return updateGrandStudentParking(event.direction)

@router.get("/garage-status/grand/student")
def read_grand_student_status():
  return getGrandStudentParking()