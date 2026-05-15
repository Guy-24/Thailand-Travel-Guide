from datetime import timedelta
from typing import Annotated, List
import os
import httpx

from fastapi import APIRouter, Depends, HTTPException, status
from requests import Session
from sqlalchemy import func, select

import models
from core.security import (
    create_access_token,
    verify_access_token,
)
from core.config import settings
from core.dependencies import verify_current_user, db_dep
from database import get_db
from schemas import (
    UserPrivate,
    UserUpdate,
)

GOOGLE_CLIENT_ID = os.getenv("Client_ID")
GOOGLE_CLIENT_SECRET = os.getenv("Client_Secret")
GOOGLE_REDIRECT_URI = "http://localhost:5173"


router = APIRouter()

@router.get("/", response_model=list[UserPrivate])
async def read_all_users(
    current_user: Annotated[models.User, Depends(verify_current_user)],
    db: db_dep,
):
    """
    Get all users
    """

    result = db.execute(select(models.User))
    users = result.scalars().all()

    return users


@router.get("/auth/callback")
async def google_callback(code: str, db: db_dep):
    # นำ Code ไปแลก Access Token และ ID Token จาก Google
    token_url = "https://oauth2.googleapis.com/token"
    token_data = {
        "code": code,
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "redirect_uri": GOOGLE_REDIRECT_URI,
        "grant_type": "authorization_code",
    }
    
    async with httpx.AsyncClient() as client:
        token_res = await client.post(token_url, data=token_data)
        if token_res.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to authenticate with Google")
            
        token_json = token_res.json()
        google_access_token = token_json.get("access_token")
        
        # นำ Access Token ไปดึงข้อมูลโปรไฟล์ผู้ใช้
        userinfo_url = "https://www.googleapis.com/oauth2/v2/userinfo"
        userinfo_res = await client.get(userinfo_url, headers={"Authorization": f"Bearer {google_access_token}"})
        user_info = userinfo_res.json()
        
    google_id = user_info.get("id")
    email = user_info.get("email").lower()
    name = user_info.get("name")
    picture = user_info.get("picture")

    # เช็ค Database
    result = db.execute(select(models.User).where(models.User.google_id == google_id))
    user = result.scalars().first()
    
    if not user:
        # สมัครสมาชิก
        user = models.User(
            google_id=google_id,
            email=email,
            user_name=name,
            picture_url=picture,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    
    # ออก JWT Token
    access_token = create_access_token(data={"sub": str(user.id)}) # เก็บ user.id ไว้ใน Token
    
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "id": user.id,
        "user_name": user.user_name,
        "picture_url": user.picture_url
    }
    

@router.get("/me", response_model=UserPrivate)
async def read_current_user(
    current_user: Annotated[models.User, Depends(verify_current_user)],
):
    """Get the currently authenticated user."""

    return current_user


@router.get("/{user_id}", response_model=UserPrivate)
async def read_user_id(
    user_id: int,
    db: db_dep,
    current_user: Annotated[models.User, Depends(verify_current_user)],
):
    """
    Get a user by ID
    """

    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to perform this action",
        )

    result = db.execute(select(models.User).where(models.User.id == user_id))
    user = result.scalars().first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    return user


@router.patch("/{user_id}", response_model=UserPrivate)
async def update_user(
    user_id: int,
    user_update: UserUpdate,
    db: db_dep,
    current_user: Annotated[models.User, Depends(verify_current_user)],
):
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to update this user's information",
        )

    result = db.execute(select(models.User).where(models.User.id == user_id))
    user = result.scalars().first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    if (
        user_update.user_name is not None
        and user_update.user_name.lower() != user.user_name.lower()
    ):
        result = db.execute(
            select(models.User).where(
                func.lower(models.User.user_name) == user_update.user_name.lower(),
            ),
        )
        existing_user = result.scalars().first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already exists",
            )

    if user_update.user_name is not None:
        user.user_name = user_update.user_name

    db.commit()
    db.refresh(user)
    return user


@router.delete("/{user_id}", status_code=status.HTTP_200_OK)
async def delete_user(
    user_id: int,
    db: db_dep,
    current_user: Annotated[models.User, Depends(verify_current_user)],
):
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to perform this action",
        )

    result = db.execute(select(models.User).where(models.User.id == user_id))
    user = result.scalars().first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User id:{user_id} not found",
        )

    db.delete(user)
    db.commit()
    return {
        "message": f"User id:'{user_id}' has been deleted",
    }