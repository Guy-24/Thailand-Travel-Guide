from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field
from datetime import datetime
from uuid import UUID


# --- USER SCHEMAS ---
class UserBase(BaseModel):
    user_name: str
    email: EmailStr 
    picture_url: str
    

class UserCreate(UserBase):
    google_id: str


class UserPublic(BaseModel):
    id: int
    user_name: str
    picture_url: str
    
    model_config = ConfigDict(from_attributes=True)
    
    
class UserPrivate(UserPublic):
    email: EmailStr 
    created_at: datetime
    google_id: str
    

class UserUpdate(BaseModel):
    user_name: str | None = Field(default=None, min_length=1, max_length=100)


# --- PLACE SCHEMAS ---
class PlaceBase(BaseModel):
    id: int
    name: str
    location: str
    region: str
    category: str
    rating: float
    reviews: int
    image: str
    tags: list
    popular: bool
    
    
# --- REVIEW SCHEMAS ---
class ReviewBase(BaseModel):
    id: Optional[int] = None
    rating: float
    user_name: str
    place_name: str