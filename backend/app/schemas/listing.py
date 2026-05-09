from pydantic import BaseModel
from typing import Optional, Dict
from datetime import datetime


from typing import List

class Location(BaseModel):
    type: str
    coordinates: List[float]


class ListingCreate(BaseModel):
    title: str
    category: str
    description: str
    quantity: int
    unit: str

    location: Location  # ✅ NEW
    image_url: Optional[str] = None
    expiry_time: Optional[datetime] = None
    metadata: Optional[Dict] = None