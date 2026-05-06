from motor.motor_asyncio import AsyncIOMotorClient
from app.config import MONGO_URI, DATABASE_NAME
from pymongo import GEOSPHERE
import asyncio


client = AsyncIOMotorClient(MONGO_URI)

database = client[DATABASE_NAME]


# Collections
user_collection = database.get_collection("users")

listing_collection = database.get_collection("listings")

notification_collection = database.get_collection("notifications")


# Create GeoSpatial Index
async def create_indexes():
    await listing_collection.create_index(
        [("location", GEOSPHERE)]
    )


# Run index creation
asyncio.create_task(create_indexes())