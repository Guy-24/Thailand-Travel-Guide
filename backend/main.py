from fastapi import FastAPI
from pydantic import json
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import sessionmaker
import os
from database import engine, SessionLocal
from dotenv import load_dotenv 
from api import user, place, review
from core.config import settings
from core.dependencies import verify_current_user, db_dep
import models
from schemas import (
    PlaceBase
)



models.Base.metadata.create_all(bind=engine)

def seed_data():
    db = SessionLocal()
    try:
        if db.query(PlaceBase).count() == 0:
            file_path = os.path.join(os.path.dirname(__file__), "places.json")
            if not os.path.exists(file_path):
                print(f"⚠️ Warning: {file_path} not found. Skipping seed.")
                return

            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                
            for item in data:
                # แก้ไขตรงนี้: ใส่เฉพาะคีย์ที่มีอยู่ใน Model เท่านั้น
                # ลบ id ออกจาก item ถ้ามี เพราะฐานข้อมูลจะสร้างให้เอง
                if "id" in item: del item["id"]
                
                # สร้าง Object แบบปลอดภัย (กัน Error ถ้า JSON มีคีย์เกิน)
                new_place = PlaceBase(**item) 
                db.add(new_place)
            
            db.commit()
            print(f"✅ Successfully seeded {len(data)} places.")
    except Exception as e:
        print(f"❌ Seed Error: {e}") # จะโชว์ Error ใน Logs แทนการทำให้แอปพัง
        db.rollback()
    finally:
        db.close()

seed_data()

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="API Backend for Thailand Travel Guide",
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://thailand-travel-guide-frontend.onrender.com",
]

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(user.router, prefix="/api/user", tags=["user"])
app.include_router(place.router, prefix="/api/place", tags=["place"])
app.include_router(review.router, prefix="/api/review", tags=["review"])

@app.get("/")
def read_root():
    return {"message": "Thailand Travel Guide API is running"}

@app.get("/healthcheck")
def health_check():
    return {"status": "connected", "database": "PostgreSQL 18"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)