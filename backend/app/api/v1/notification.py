from fastapi import APIRouter, Depends
from app.dependencies.auth_dependency import get_current_user
from app.services.notification_service import get_notifications

router = APIRouter()


@router.get("/")
async def fetch_notifications(user=Depends(get_current_user)):
    return await get_notifications(user["user_id"])