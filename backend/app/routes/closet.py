from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Clothes, Category, User
from ..routes.auth import get_current_user
from ..schemas import ClothesCreate, ClothesResponse, CategoryResponse

router = APIRouter()

@router.get("/categories", response_model=List[CategoryResponse])
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(Category).all()
    return categories

@router.get("/clothes", response_model=List[ClothesResponse])
def get_clothes(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    clothes = db.query(Clothes).filter(Clothes.user_id == current_user.id).all()
    return clothes

@router.post("/clothes", response_model=ClothesResponse)
def create_clothes(clothes: ClothesCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_clothes = Clothes(**clothes.dict(), user_id=current_user.id)
    db.add(db_clothes)
    db.commit()
    db.refresh(db_clothes)
    return db_clothes

@router.put("/clothes/{clothes_id}", response_model=ClothesResponse)
def update_clothes(clothes_id: int, clothes: ClothesCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_clothes = db.query(Clothes).filter(Clothes.id == clothes_id, Clothes.user_id == current_user.id).first()
    if not db_clothes:
        raise HTTPException(status_code=404, detail="Clothes not found")
    for key, value in clothes.dict().items():
        setattr(db_clothes, key, value)
    db.commit()
    db.refresh(db_clothes)
    return db_clothes

@router.delete("/clothes/{clothes_id}")
def delete_clothes(clothes_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_clothes = db.query(Clothes).filter(Clothes.id == clothes_id, Clothes.user_id == current_user.id).first()
    if not db_clothes:
        raise HTTPException(status_code=404, detail="Clothes not found")
    db.delete(db_clothes)
    db.commit()
    return {"message": "Clothes deleted"}