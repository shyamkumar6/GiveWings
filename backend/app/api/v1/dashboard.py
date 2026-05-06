from fastapi import APIRouter, Depends
from app.services.dashboard_service import get_dashboard_stats
from app.dependencies.auth_dependency import get_current_user

router = APIRouter()


@router.get("/")
async def dashboard(user=Depends(get_current_user)):
    return await get_dashboard_stats()