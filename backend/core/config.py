from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import SecretStr
from typing import List, Optional

class Settings(BaseSettings):
    APP_NAME: str = "Thailand Travel Guide"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # CORS
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8000"]
    
    # แก้จุดนี้: ใส่ค่าเริ่มต้นให้มันเลย (ถ้าใน .env ไม่มี มันจะใช้ค่านี้แทน ไม่ error ครับ)
    secret_key: str = "insecure-default-key-for-ci-testing"
    
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # ใช้ ConfigDict แบบ Pydantic v2 (Warning จะหายไป 100% ครับ)
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding='utf-8',
        extra="allow",
        case_sensitive=False # ทำให้มันไม่สนใจตัวเล็กตัวใหญ่เวลาอ่าน Env
    )

settings = Settings()