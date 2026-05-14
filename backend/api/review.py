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
    ReviewBase
)

GOOGLE_CLIENT_ID = os.getenv("Client_ID")
GOOGLE_CLIENT_SECRET = os.getenv("Client_Secret")
GOOGLE_REDIRECT_URI = "http://localhost:5173"

router = APIRouter()

@router.get("/", response_model=list[ReviewBase])
async def read_all_reviews(
    current_user: Annotated[models.User, Depends(verify_current_user)],
    db: db_dep,
):
    """
    Get all reviews
    """

    result = db.execute(select(models.Review))
    reviews = result.scalars().all()

    return reviews

@router.get("/my_reviews", response_model=list[ReviewBase])
async def get_my_reviews(
    current_user: Annotated[models.User, Depends(verify_current_user)],
    db: db_dep,
):
    """
    Get reviews for the current user
    """
    # ดึงข้อมูลรีวิวที่ user_name ตรงกับชื่อของ current_user
    result = db.execute(
        select(models.Review).where(models.Review.user_name == current_user.user_name)
    )
    reviews = result.scalars().all()
    
    return reviews


@router.post("/", response_model=ReviewBase)
async def post_my_review(
    review: ReviewBase,
    current_user: Annotated[models.User, Depends(verify_current_user)],
    db: db_dep,
):
    """
    Create a new review
    """
    try:
        existing_review = db.execute(
            select(models.Review).where(
                models.Review.user_name == current_user.user_name,
                models.Review.place_name == review.place_name
            )
        ).scalars().first()

        if existing_review:
            # ถ้าเจอข้อมูลว่าเคยรีวิวแล้ว ให้ส่ง Error 400 กลับไป
            raise HTTPException(status_code=400, detail="คุณได้ให้คะแนนรีวิวสถานที่นี้ไปแล้ว")
        
        new_review = models.Review(
            rating=review.rating,
            user_name=current_user.user_name, 
            place_name=review.place_name
        )

        db.add(new_review)
        db.commit()

        db.refresh(new_review)

        return new_review

    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"เกิดข้อผิดพลาด: {str(e)}")