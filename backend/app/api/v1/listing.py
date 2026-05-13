from fastapi import (
    APIRouter,
    HTTPException,
    Depends,
    UploadFile,
    File
)

import cloudinary.uploader

from app.schemas.listing import (
    ListingCreate
)

from app.dependencies.auth_dependency import (
    get_current_user
)

from app.services.listing_service import (

    create_listing,

    get_nearby_listings,

    accept_listing_service,

    complete_listing_service,

    get_accepted_donations_service,

    get_my_donations_service
)


router = APIRouter(
    prefix="/api/v1/listings",
    tags=["Listings"]
)


# =========================================
# CREATE DONATION
# =========================================

@router.post("")
async def create(
    data: ListingCreate,
    user=Depends(get_current_user)
):

    try:

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
            "listing_id":
                listing_id
        }

    except HTTPException as e:

        raise e

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# =========================================
# NEARBY DONATIONS
# =========================================

@router.get("/nearby")
async def nearby_listings(
    lat: float,
    lng: float,
    user=Depends(get_current_user)
):

    try:

        return await get_nearby_listings(
            lat,
            lng
        )

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# =========================================
# ACCEPT DONATION
# =========================================

@router.post("/accept/{listing_id}")
async def accept_listing(
    listing_id: str,
    user=Depends(get_current_user)
):

    try:

        await accept_listing_service(
            listing_id,
            user
        )

        return {
            "message":
                "Listing reserved successfully"
        }

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# =========================================
# COMPLETE DONATION
# =========================================

@router.post("/complete/{listing_id}")
async def complete_listing(
    listing_id: str,
    user=Depends(get_current_user)
):

    try:

        await complete_listing_service(
            listing_id,
            user
        )

        return {
            "message":
                "Listing marked as completed"
        }

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# =========================================
# ACCEPTED DONATIONS
# =========================================

@router.get("/accepted")
async def get_accepted_donations(
    user=Depends(get_current_user)
):

    try:

        return await get_accepted_donations_service(
            user
        )

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# =========================================
# MY DONATIONS
# =========================================

@router.get("/my-donations")
async def my_donations(
    user=Depends(get_current_user)
):

    try:

        return await get_my_donations_service(
            user
        )

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# =========================================
# IMAGE UPLOAD
# =========================================

@router.post("/upload-image")
async def upload_listing_image(
    file: UploadFile = File(...)
):

    result = cloudinary.uploader.upload(
        file.file,
        folder="givewings/donations"
    )

    return {
        "image_url":
            result["secure_url"]
    }