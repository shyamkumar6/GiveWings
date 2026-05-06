from app.db.mongo import notification_collection
from datetime import datetime


async def create_notification(user_id, message):
    await notification_collection.insert_one({
        "user_id": user_id,
        "message": message,
        "is_read": False,
        "created_at": datetime.utcnow()
    })


async def get_notifications(user_id):
    notifications = notification_collection.find({
        "user_id": user_id
    }).sort("created_at", -1)

    result = []
    async for n in notifications:
        result.append({
            "id": str(n["_id"]),
            "message": n["message"],
            "is_read": n["is_read"],
            "created_at": n["created_at"]
        })

    return result