from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Clothes, User
from ..routes.auth import get_current_user
from ..schemas import ClothesResponse

router = APIRouter()

@router.get("/suggest-outfit", response_model=List[ClothesResponse])
def suggest_outfit(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Simple suggestion: get one item from each category
    categories = [1, 2, 3, 4, 5, 6]  # IDs from categories table
    outfit = []
    for cat_id in categories:
        item = db.query(Clothes).filter(Clothes.user_id == current_user.id, Clothes.category_id == cat_id).first()
        if item:
            outfit.append(item)
    return outfit