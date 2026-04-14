from sqlalchemy import Column, Integer, String, Boolean, Text, TIMESTAMP, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP, default="CURRENT_TIMESTAMP")

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

class Clothes(Base):
    __tablename__ = "clothes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String)
    category_id = Column(Integer, ForeignKey("categories.id"))
    color = Column(String)
    size = Column(String)
    brand = Column(String)
    image_url = Column(String)
    description = Column(Text)
    created_at = Column(TIMESTAMP, default="CURRENT_TIMESTAMP")

    user = relationship("User")
    category = relationship("Category")

class Outfit(Base):
    __tablename__ = "outfits"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String)
    description = Column(Text)
    created_at = Column(TIMESTAMP, default="CURRENT_TIMESTAMP")

    user = relationship("User")

class OutfitItem(Base):
    __tablename__ = "outfit_items"

    id = Column(Integer, primary_key=True, index=True)
    outfit_id = Column(Integer, ForeignKey("outfits.id"))
    clothes_id = Column(Integer, ForeignKey("clothes.id"))

    outfit = relationship("Outfit")
    clothes = relationship("Clothes")