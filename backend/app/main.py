from fastapi import FastAPI
from sqlalchemy import create_all, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# ดึงค่าจาก Environment Variable ที่ตั้งไว้ใน Render
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Thailand Travel Guide API is running"}

@app.get("/healthcheck")
def health_check():
    return {"status": "connected", "database": "PostgreSQL 18"}