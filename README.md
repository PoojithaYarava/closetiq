# ClosetIQ

A professional closet management dashboard with outfit recommendations.

## Features

- 👗 User authentication (login/register)
- 📱 Professional dashboard UI
- 👚 Manage your closet items
- 🤖 AI-powered outfit recommendations
- 🔗 Full-stack app with React frontend and FastAPI backend

## Tech Stack

- **Frontend**: React, Material-UI, Vite
- **Backend**: FastAPI, SQLAlchemy, SQLite
- **Authentication**: JWT tokens

## Setup

### Backend

1. Install Python dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. Initialize database:
   ```bash
   python init_db.py
   ```

3. Start the backend server:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend

1. Install Node.js dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5173 in your browser

## API Endpoints

- `POST /auth/register` - Register new user
- `POST /auth/token` - Login
- `GET /auth/me` - Get current user
- `GET /closet/clothes` - Get user's clothes
- `POST /closet/clothes` - Add new clothes item
- `PUT /closet/clothes/{id}` - Update clothes item
- `DELETE /closet/clothes/{id}` - Delete clothes item
- `GET /closet/categories` - Get categories
- `GET /recommendations/suggest-outfit` - Get outfit suggestion

## Usage

1. Register a new account or login
2. Add items to your closet
3. View your dashboard
4. Get outfit recommendations