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
    PlaceBase
)

GOOGLE_CLIENT_ID = os.getenv("Client_ID")
GOOGLE_CLIENT_SECRET = os.getenv("Client_Secret")
GOOGLE_REDIRECT_URI = "http://localhost:5173"

router = APIRouter()

@router.get("/", response_model=list[PlaceBase])
async def read_all_places(
    current_user: Annotated[models.User, Depends(verify_current_user)],
    db: db_dep,
):
    """
    Get all places
    """

    result = db.execute(select(models.Place))
    places = result.scalars().all()

    return places
