from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import auth, closet, recommendations
from .database import Base, engine
from .models import User, Category, Clothes, Outfit, OutfitItem

app = FastAPI(title="ClosetIQ API", version="1.0.0")

# Ensure DB tables exist on startup
Base.metadata.create_all(bind=engine)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174", "http://localhost:5175", "http://127.0.0.1:5175"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["authentication"])
app.include_router(closet.router, prefix="/closet", tags=["closet"])
app.include_router(recommendations.router, prefix="/recommendations", tags=["recommendations"])

@app.get("/")
async def root():
    return {"message": "Welcome to ClosetIQ API"}