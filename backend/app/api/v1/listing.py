from fastapi import APIRouter, HTTPException, Depends
from app.schemas.listing import ListingCreate
from app.services.listing_service import create_listing
from app.dependencies.auth_dependency import get_current_user
from app.db.mongo import listing_collection
from app.models.listing_model import listing_helper
from fastapi import Body
from bson import ObjectId
from app.services.listing_service import accept_listing_service
import traceback


router = APIRouter(
    prefix="/api/v1/listings",
    tags=["Listings"]
)


@router.post("")
async def create(
    data: ListingCreate,
    user=Depends(get_current_user)
):
    try:
        # ✅ Only DONOR can create listings
        if user["role"] != "DONOR":
            raise HTTPException(
                status_code=403,
                detail="Only donors can create listings"
            )

        listing_id = await create_listing(
            data.dict(),
            user
        )

        return {
            "listing_id": listing_id
        }

    except HTTPException as e:
        raise e

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
    
@router.get("/nearby")
async def nearby_donations(
    lat: float,
    lng: float,
    user=Depends(get_current_user)
):
    donations = await listing_collection.find({
        "status": "AVAILABLE",
        "location": {
            "$near": {
                "$geometry": {
                    "type": "Point",
                    "coordinates": [lng, lat]
                },
                "$maxDistance": 10000
            }
        }
    }).to_list(100)

    for item in donations:
        item["_id"] = str(item["_id"])

    return donations


@router.post("/accept/{listing_id}")
async def accept_listing(
    listing_id: str,
    user=Depends(get_current_user)
):
    try:
        await accept_listing_service(listing_id, user)
        return {"message": "Listing reserved successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

from app.services.listing_service import complete_listing_service

@router.post("/complete/{listing_id}")
async def complete_listing(
    listing_id: str,
    user=Depends(get_current_user)
):
    try:
        await complete_listing_service(listing_id, user)
        return {"message": "Listing marked as completed"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))