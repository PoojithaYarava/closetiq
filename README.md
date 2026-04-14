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
- **Backend**: FastAPI, SQLAlchemy, PostgreSQL / SQLite
- **Authentication**: JWT tokens

## Setup

### Backend

1. Install Python dependencies (use a compatible interpreter, such as Python 3.13):
   ```bash
   cd backend
   py -3.13 -m pip install --user -r requirements.txt
   ```

2. Configure PostgreSQL if desired:
   - Copy `backend/.env.example` to `backend/.env` and update the connection string.
   - Example `.env` content:
     ```env
     DATABASE_URL=postgresql://closet_user:closet_pass@localhost:5432/closetiq
     ```
   - If `DATABASE_URL` is not set, the app falls back to `sqlite:///./closetiq.db`.

3. Initialize database:
   ```bash
   py -3.13 init_db.py
   ```

4. Start the backend server:
   ```bash
   py -3.13 -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

> Note: The frontend Vite dev server proxies `/auth`, `/closet`, and `/recommendations` to `http://localhost:8000`.
### PostgreSQL with Docker

To run the full backend and PostgreSQL locally using Docker Compose:
```bash
docker-compose up --build -d
```
This starts PostgreSQL and the backend API on `http://localhost:8000`.

If you want to use a local `.env` file instead, copy `backend/.env.example` to `backend/.env` and update it with your database credentials.
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