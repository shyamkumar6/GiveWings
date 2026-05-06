from bson import ObjectId


def listing_helper(listing) -> dict:
    return {
        "id": str(listing["_id"]),
        "title": listing.get("title"),
        "category": listing.get("category"),
        "description": listing.get("description"),
        "quantity": listing.get("quantity"),
        "unit": listing.get("unit"),
        "status": listing.get("status"),
        "location": listing.get("location"),
        "expiry_time": listing.get("expiry_time"),
        "donor_id": listing.get("donor_id"),
    }