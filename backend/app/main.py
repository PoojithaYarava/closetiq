from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import auth, closet, recommendations

app = FastAPI(title="ClosetIQ API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
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