from app.db.mongo import listing_collection


async def get_dashboard_stats():
    total_listings = await listing_collection.count_documents({})

    completed_listings = await listing_collection.count_documents({
        "status": "COMPLETED"
    })

    total_quantity = 0

    completed_items = listing_collection.find({
        "status": "COMPLETED"
    })

    async for item in completed_items:
        total_quantity += item.get("quantity", 0)

    return {
        "total_listings": total_listings,
        "completed_listings": completed_listings,
        "total_items_saved": total_quantity
    }