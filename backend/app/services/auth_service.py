from app.db.mongo import user_collection
from app.utils.security import hash_password, verify_password, create_access_token
from datetime import datetime


async def register_user(data):
    existing = await user_collection.find_one({"email": data["email"]})
    if existing:
        raise Exception("User already exists")

    # 🔐 hash password
    data["password"] = hash_password(data["password"])

    # 🆕 add verification flag
    data["is_verified"] = False

    # 📅 timestamp
    data["created_at"] = datetime.utcnow()

    result = await user_collection.insert_one(data)
    return str(result.inserted_id)


async def login_user(data):
    user = await user_collection.find_one({"email": data["email"]})
    if not user:
        raise Exception("Invalid credentials")

    if not verify_password(data["password"], user["password"]):
        raise Exception("Invalid credentials")

    token = create_access_token({
        "user_id": str(user["_id"]),
        "role": user["role"]
    })

    return {"access_token": token}