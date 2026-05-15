from __future__ import annotations
from sqlalchemy.ext.compiler import compiles
from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.postgresql import JSONB
from database import Base
from datetime import UTC, datetime

from sqlalchemy import JSON, Boolean, DateTime, FetchedValue, Float, ForeignKey, Integer, String, Text, Index
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    google_id: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    user_name: Mapped[str] = mapped_column(String(100), unique=False, nullable=False)
    picture_url: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        server_default=func.now()
    )
    
@compiles(JSONB, 'sqlite')
def compile_jsonb_sqlite(type_, compiler, **kw):
    return 'JSON'

class Place(Base):
    __tablename__ = "places"
    
    # id: Mapped[uuid.UUID] = mapped_column(
    #     UUID(as_uuid=True), 
    #     primary_key=True, 
    #     server_default=func.gen_random_uuid()
    # )
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    location: Mapped[str] = mapped_column(String(255), nullable=False)
    region: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(String(255), nullable=False)
    rating: Mapped[float] = mapped_column(Float, nullable=False)
    reviews: Mapped[int] = mapped_column(Integer, nullable=False)
    image: Mapped[str] = mapped_column(Text, nullable=False)
    tags: Mapped[JSONB] = mapped_column(JSONB, nullable=False)
    popular: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    
class Review(Base):
    __tablename__ = "reviews"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    rating: Mapped[float] = mapped_column(Float, nullable=False)
    user_name: Mapped[str] = mapped_column(String(100), unique=False, nullable=False)
    place_name: Mapped[str] = mapped_column(String(100), unique=False, nullable=False)
