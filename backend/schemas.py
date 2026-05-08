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
    email: EmailStr | None = Field(default=None, max_length=255)
    picture_url: str | None = Field(default=None)