from fastapi import HTTPException

from datetime import (
    datetime,
    timezone
)

from bson import ObjectId

from app.db.mongo import (
    listing_collection,
    user_collection
)

from app.websockets.connection_manager import manager

from app.services.notification_service import (
    create_notification
)


# =========================================
# AREA LABEL
# =========================================

def get_area_label(lat, lng):

    if 17.44 <= lat <= 17.47:
        return "Hitech City, Hyderabad"

    if 17.38 <= lat <= 17.40:
        return "Central Hyderabad"

    return "Hyderabad"


# =========================================
# CREATE LISTING
# =========================================

async def create_listing(data, user):

    data["donor_id"] = user["user_id"]

    data["created_at"] = datetime.utcnow()

    data["status"] = "AVAILABLE"


    # FOOD VALIDATION

    if (
        data["category"] == "FOOD"
        and
        not data.get("expiry_time")
    ):

        raise Exception(
            "Expiry time is required for food"
        )


    # QUANTITY VALIDATION

    if data["quantity"] <= 0:

        raise HTTPException(
            status_code=400,
            detail="Quantity must be greater than 0"
        )


    # EXPIRY VALIDATION

    if data.get("expiry_time"):

        expiry = data["expiry_time"]

        if expiry <= datetime.now(timezone.utc):

            raise HTTPException(
                status_code=400,
                detail="Expiry must be future time"
            )


    result = await listing_collection.insert_one(data)


    # NOTIFY ALL NGOS

    ngos = user_collection.find({
        "role": "NGO"
    })

    async for ngo in ngos:

        ngo_id = str(ngo["_id"])


        # DB Notification

        await create_notification(
            ngo_id,
            f"New donation available: {data['title']}"
        )


        # REAL-TIME TRIGGER

        await manager.send_personal_message(
            ngo_id,
            {
                "type": "NEW_LISTING",
                "message": data["title"]
            }
        )


    return str(result.inserted_id)


# =========================================
# NEARBY LISTINGS
# =========================================

async def get_nearby_listings(
    lat,
    lng
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
                    ObjectId(
                        item["donor_id"]
                    )
            }
        )

        result.append({

            "_id":
                str(item["_id"]),

            "title":
                item.get("title"),

            "description":
                item.get("description"),

            "category":
                item.get("category"),

            "quantity":
                item.get("quantity"),

            "unit":
                item.get("unit"),

            "status":
                item.get("status"),

            "image_url":
                item.get("image_url"),

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
                item.get("location"),

            "location_label":
                get_area_label(
                    item["location"]["coordinates"][1],
                    item["location"]["coordinates"][0]
                ),

            "donor": {

                "name":
                    donor.get("name"),

                "email":
                    donor.get("email")

            }

        })

    return result


# =========================================
# ACCEPT LISTING
# =========================================

async def accept_listing_service(
    listing_id,
    user
):

    if user["role"] != "NGO":

        raise Exception(
            "Only NGOs can accept listings"
        )


    result = await listing_collection.find_one_and_update(
        {
            "_id":
                ObjectId(listing_id),

            "status":
                "AVAILABLE"
        },

        {
            "$set": {

                "status":
                    "RESERVED",

                "accepted_by":
                    user["user_id"]
            }
        }
    )


    if not result:

        raise Exception(
            "Listing already taken or not found"
        )


    # DONOR NOTIFICATION

    await create_notification(
        result["donor_id"],
        "Your donation has been accepted by an NGO"
    )


    # REAL-TIME

    await manager.send_personal_message(
        result["donor_id"],
        {
            "type": "ACCEPTED",
            "message":
                "Your donation was accepted by an NGO"
        }
    )

    return True


# =========================================
# COMPLETE LISTING
# =========================================

async def complete_listing_service(
    listing_id,
    user
):

    listing = await listing_collection.find_one({
        "_id": ObjectId(listing_id)
    })


    if not listing:

        raise Exception("Listing not found")


    if (
        listing.get("accepted_by")
        !=
        user["user_id"]
    ):

        raise Exception("Not authorized")


    if (
        listing.get("status")
        !=
        "RESERVED"
    ):

        raise Exception("Invalid status")


    await listing_collection.update_one(
        {
            "_id":
                ObjectId(listing_id)
        },

        {
            "$set": {
                "status": "COMPLETED"
            }
        }
    )


    # DONOR NOTIFICATION

    await create_notification(
        listing["donor_id"],
        "Your donation has been successfully picked up 🎉"
    )


    # REAL-TIME

    await manager.send_personal_message(
        listing["donor_id"],
        {
            "type": "COMPLETED",
            "message": "Donation picked up 🎉"
        }
    )

    return True


# =========================================
# ACCEPTED DONATIONS
# =========================================

async def get_accepted_donations_service(
    user
):

    donations = await listing_collection.find(
        {
            "accepted_by":
                user["user_id"],

            "status":
                "RESERVED"
        }
    ).to_list(100)

    result = []

    for item in donations:

        donor = await user_collection.find_one(
            {
                "_id":
                    ObjectId(
                        item["donor_id"]
                    )
            }
        )

        result.append({

            "_id":
                str(item["_id"]),

            "title":
                item.get("title"),

            "description":
                item.get("description"),

            "category":
                item.get("category"),

            "quantity":
                item.get("quantity"),

            "unit":
                item.get("unit"),

            "status":
                item.get("status"),

            "image_url":
                item.get("image_url"),

            "phone_number":
                item.get("phone_number"),

            "pickup_instructions":
                item.get(
                    "pickup_instructions"
                ),

            "location":
                item.get("location"),

            "location_label":
                get_area_label(
                    item["location"]["coordinates"][1],
                    item["location"]["coordinates"][0]
                ),

            "expiry_time":
                item.get("expiry_time"),

            "donor": {

                "name":
                    donor.get(
                        "name",
                        "Unknown Donor"
                    ) if donor else "Unknown Donor",

                "email":
                    donor.get(
                        "email",
                        ""
                    ) if donor else ""

            }

        })

    return result


# =========================================
# MY DONATIONS
# =========================================

async def get_my_donations_service(
    user
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

            "_id":
                str(item["_id"]),

            "title":
                item.get("title"),

            "description":
                item.get("description"),

            "category":
                item.get("category"),

            "quantity":
                item.get("quantity"),

            "unit":
                item.get("unit"),

            "status":
                item.get("status"),

            "created_at":
                item.get("created_at"),

            "expiry_time":
                item.get("expiry_time"),

        })

    return result