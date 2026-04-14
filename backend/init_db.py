from app.database import Base, engine
from app.models import User, Category, Clothes, Outfit, OutfitItem

# Create all tables
Base.metadata.create_all(bind=engine)

print("Database initialized!")