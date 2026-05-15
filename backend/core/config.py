from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import SecretStr
from typing import List, Optional

class Settings(BaseSettings):
    APP_NAME: str = "Thailand Travel Guide"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # CORS
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8000","https://thailand-travel-guide.onrender.com"]
    
    # แก้จุดนี้: ใส่ค่าเริ่มต้น (Default) ให้มันเลยครับ 
    # ต่อให้ไม่มีไฟล์ .env ระบบก็จะเอาค่านี้ไปใช้ และจะไม่เกิด Error ครับ
    secret_key: str = "insecure-default-key-for-dev-and-test"
    
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # ใช้รูปแบบ Pydantic v2 เพื่อลบ Warning ทิ้งให้หมด
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding='utf-8',
        extra="allow",
        case_sensitive=False
    )

settings = Settings()