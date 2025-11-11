from fastapi import APIRouter, HTTPException
from datetime import datetime, timezone
from config.db import get_db
from models.user import SignupIn, LoginIn, UserOut
from utils.security import hash_password, verify_password, create_token

router = APIRouter(prefix="/auth", tags=["auth"])
collection = get_db()["users"]
collection.create_index("email", unique=True)

def serialize_user(data) -> UserOut:
    return UserOut(id=str(data["_id"]), username=data["username"], email=data["email"])

@router.post("/signup")
def register_user(payload: SignupIn):
    existing = collection.find_one({"email": payload.email.lower()})
    if existing:
        raise HTTPException(status_code=409, detail="Email already registered")

    new_user = {
        "username": payload.username.strip(),
        "email": payload.email.lower(),
        "password": hash_password(payload.password),
        "created_at": datetime.now(timezone.utc),
    }

    inserted = collection.insert_one(new_user)
    user = collection.find_one({"_id": inserted.inserted_id})
    token = create_token(str(user["_id"]))
    return {"token": token, "user": serialize_user(user).model_dump()}

@router.post("/login")
def login_user(payload: LoginIn):
    user = collection.find_one({"email": payload.email.lower()})
    if not user or not verify_password(payload.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token(str(user["_id"]))
    return {"token": token, "user": serialize_user(user).model_dump()}
