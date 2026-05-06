from fastapi import APIRouter, HTTPException
from app.schemas.user import UserCreate, UserLogin
from app.services.auth_service import register_user, login_user

router = APIRouter(
    prefix="/api/v1/auth",
    tags=["Auth"]
)


@router.post("/register")
async def register(user: UserCreate):
    try:
        user_id = await register_user(user.dict())
        return {"user_id": user_id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login")
async def login(user: UserLogin):
    try:
        return await login_user(user.dict())
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))