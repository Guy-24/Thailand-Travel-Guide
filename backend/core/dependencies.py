from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select
from sqlalchemy.orm import Session
from database import get_db
from core.security import (
    create_access_token,
    verify_access_token,
)
import models
from core.security import verify_access_token 
from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")
security = HTTPBearer()

# Reusable Types
db_dep = Annotated[Session, Depends(get_db)]
token_dep = Annotated[str, Depends(oauth2_scheme)]


async def verify_current_user(
    auth: Annotated[HTTPAuthorizationCredentials, Depends(security)], 
    db: db_dep
) -> models.User:
    """
    ตรวจสอบ Token และคืนค่า User object จากฐานข้อมูล
    """
    # ดึง string token ออกมาจากก้อน auth
    token = auth.credentials 
    
    user_id = verify_access_token(token)
    
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        user_id_int = int(user_id)
        result = db.execute(select(models.User).where(models.User.id == user_id_int))
        user = result.scalars().first()
    except (TypeError, ValueError):
        user = None

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return user


# Alias สำหรับการเรียกใช้งานที่อ่านง่ายขึ้น
# current_user_dep = Annotated[models.User, Depends(verify_current_user)]
# admin_dep = Annotated[models.User, Depends(verify_admin)]