import os
import jwt
from datetime import datetime, timedelta, timezone
from passlib.hash import pbkdf2_sha256

KEY = os.getenv("JWT_SECRET", "dev")
TTL = int(os.getenv("JWT_EXPIRE_MIN", "60"))

def hash_password(password: str) -> str:
    return pbkdf2_sha256.hash(password)

def verify_password(password: str, stored: str) -> bool:
    return pbkdf2_sha256.verify(password, stored)

def create_token(user_id: str) -> str:
    now = datetime.now(timezone.utc)
    exp = now + timedelta(minutes=TTL)
    payload = {
        "sub": user_id,
        "iat": int(now.timestamp()),
        "exp": int(exp.timestamp()),
    }
    return jwt.encode(payload, KEY, algorithm="HS256")
