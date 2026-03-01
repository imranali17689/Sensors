from fastapi import FastAPI

app = FastAPI(
  title = "OpenSpot Backend API", 
  description = "Backend service for sensor ingestion and parking status",
  version = "1.0.0"
)

@app.get("/")
def read_root():
  return {"message": "OpenSpot backend is running"}