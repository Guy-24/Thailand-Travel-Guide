from fastapi import FastAPI
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv 
from api import user, place, review
from core.config import settings
from core.dependencies import verify_current_user, db_dep


load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
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