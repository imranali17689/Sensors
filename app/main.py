from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.supabaseClient import getSupabase

from app.routes.garageEvent import router as garage_router

app = FastAPI(
  title = "OpenSpot Backend API", 
  description = "Backend service for sensor ingestion and parking status",
  version = "1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(garage_router)

@app.get("/")
def read_root():
  return {"message": "OpenSpot backend is running"}


@app.get("/db-ping")
def db_ping():
  try: 
    dbConnect = getSupabase()
    return {
      "status": "success",
      "message": "Supabase client initialized"
    }
  except Exception as e:
    return {
      "status": "error",
      "detail": str(e)
      }
  
