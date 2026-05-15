from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import SecretStr
from typing import List


class Settings(BaseSettings):
    APP_NAME: str = "Thailand Travel Guide"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # CORS
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8000"]
    
    secret_key: SecretStr = SecretStr("temporary_secret_key_for_testing_purposes_only")
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    class Config:
        env_file = ".env"
        extra = "allow"


settings = Settings()

