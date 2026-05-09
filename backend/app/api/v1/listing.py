from fastapi import APIRouter, HTTPException, Depends
from app.schemas.listing import ListingCreate
from app.services.listing_service import create_listing
from app.dependencies.auth_dependency import get_current_user
from app.db.mongo import listing_collection
from app.models.listing_model import listing_helper
from fastapi import Body
from bson import ObjectId
from app.services.listing_service import accept_listing_service
from bson import ObjectId
from app.db.mongo import (
    listing_collection,
    user_collection
)


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
    
def get_area_label(lat, lng):

    # Temporary simplified mapping

    if (
        17.44 <= lat <= 17.47
    ):
        return "Hitech City, Hyderabad"

    if (
        17.38 <= lat <= 17.40
    ):
        return "Central Hyderabad"

    return "Hyderabad"

@router.get("/nearby")
async def nearby_listings(
    lat: float,
    lng: float,
    user=Depends(get_current_user)
):

    listings = await listing_collection.aggregate([
    {
        "$geoNear": {

            "near": {
                "type": "Point",
                "coordinates": [lng, lat]
            },

            "distanceField":
                "distance",

            "maxDistance":
                10000,

            "spherical":
                True,

            "query": {
                "status": "AVAILABLE"
            }
        }
    }
    ]).to_list(100)

    result = []

    for item in listings:

        donor = await user_collection.find_one(
            {
                "_id":
                ObjectId(item["donor_id"])
            }
        )

        result.append({

            "_id": str(item["_id"]),

            "title": item["title"],

            "description":
                item["description"],

            "category":
                item["category"],

            "quantity":
                item["quantity"],

            "unit":
                item["unit"],

            "status":
                item["status"],

            "expiry_time":
                item.get("expiry_time"),

            "created_at":
                item.get("created_at"),

            "distance_km":
                round(
                    item["distance"] / 1000,
                    2
                ),

            "location":
                item["location"],

            "location_label":
                get_area_label(
                    item["location"]["coordinates"][1],
                    item["location"]["coordinates"][0]
                ),
            # Donor Details
            "donor": {

                "name":
                    donor.get("name"),

                "email":
                    donor.get("email"),
            }
        })

    return result


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


@router.get("/accepted")
async def get_accepted_donations(
    user=Depends(get_current_user)
):

    donations = await listing_collection.find(
        {
            "accepted_by": user["user_id"],
            "status": "RESERVED"
        }
    ).to_list(100)

    for item in donations:
        item["_id"] = str(item["_id"])

    return donations

@router.get("/my-donations")
async def my_donations(
    user=Depends(get_current_user)
):

    donations = await listing_collection.find(
        {
            "donor_id":
                user["user_id"]
        }
    ).sort(
        "created_at",
        -1
    ).to_list(100)


    result = []

    for item in donations:

        result.append({

            "_id": str(item["_id"]),

            "title":
                item["title"],

            "description":
                item["description"],

            "category":
                item["category"],

            "quantity":
                item["quantity"],

            "unit":
                item["unit"],

            "status":
                item["status"],

            "created_at":
                item.get("created_at"),

            "expiry_time":
                item.get("expiry_time"),
        })

    return result