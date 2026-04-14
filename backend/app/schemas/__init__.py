from pydantic import BaseModel
from typing import Optional

class ClothesBase(BaseModel):
    name: str
    category_id: Optional[int] = None
    color: Optional[str] = None
    size: Optional[str] = None
    brand: Optional[str] = None
    image_url: Optional[str] = None
    description: Optional[str] = None

class ClothesCreate(ClothesBase):
    pass

class ClothesResponse(ClothesBase):
    id: int
    user_id: int
    created_at: str

    class Config:
        from_attributes = True

class CategoryResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True