from fastapi import HTTPException
from datetime import datetime
from app.db.mongo import database
from datetime import datetime
from app.db.mongo import listing_collection
from app.websockets.connection_manager import manager
from app.services.notification_service import create_notification
from app.db.mongo import user_collection
from datetime import timezone


async def create_listing(data, user):
    data["donor_id"] = user["user_id"]
    data["created_at"] = datetime.utcnow()
    data["status"] = "AVAILABLE"


    # Food validation
    if data["category"] == "FOOD" and not data.get("expiry_time"):
        raise Exception("Expiry time is required for food")
    
    if data["quantity"] <= 0:
        raise HTTPException(status_code=400, detail="Quantity must be greater than 0")
    
    if data.get("expiry_time"):
        expiry = data["expiry_time"]

        if expiry <= datetime.now(timezone.utc):
            raise HTTPException(
                status_code=400,
                detail="Expiry must be future time"
            )
        
    result = await listing_collection.insert_one(data)

    # Notify all NGOs
    ngos = user_collection.find({"role": "NGO"})

    async for ngo in ngos:
        ngo_id = str(ngo["_id"])

        # DB notification
        await create_notification(
            ngo_id,
            f"New donation available: {data['title']}"
        )

        # ⚡ REAL-TIME TRIGGER
        await manager.send_personal_message(
            ngo_id,
            {
                "type": "NEW_LISTING",
                "message": data["title"]
            }
        )
    return str(result.inserted_id)

from app.db.mongo import listing_collection
from app.services.notification_service import create_notification
from bson import ObjectId


async def accept_listing_service(listing_id, user):
    if user["role"] != "NGO":
        raise Exception("Only NGOs can accept listings")

    result = await listing_collection.find_one_and_update(
        {
            "_id": ObjectId(listing_id),
            "status": "AVAILABLE"
        },
        {
            "$set": {
                "status": "RESERVED",
                "accepted_by": user["user_id"]
            }
        }
    )

    if not result:
        raise Exception("Listing already taken or not found")

    # 🔔 Notification
    await create_notification(
        result["donor_id"],
        "Your donation has been accepted by an NGO"
    )

    # ⚡ REAL-TIME TRIGGER (ADD HERE)
    await manager.send_personal_message(
    result["donor_id"],
    {
        "type": "ACCEPTED",
        "message": "Your donation was accepted by an NGO"
    }
)

    return True

async def complete_listing_service(listing_id, user):
    listing = await listing_collection.find_one({
        "_id": ObjectId(listing_id)
    })

    if not listing:
        raise Exception("Listing not found")

    if listing.get("accepted_by") != user["user_id"]:
        raise Exception("Not authorized")

    if listing.get("status") != "RESERVED":
        raise Exception("Invalid status")

    await listing_collection.update_one(
        {"_id": ObjectId(listing_id)},
        {
            "$set": {
                "status": "COMPLETED"
            }
        }
    )

    # 🔔 Notification
    await create_notification(
        listing["donor_id"],
        "Your donation has been successfully picked up 🎉"
    )

    # ⚡ REAL-TIME TRIGGER
    await manager.send_personal_message(
    listing["donor_id"],
    {
        "type": "COMPLETED",
        "message": "Donation picked up 🎉"
    }
)

    return True