# 🗒️ NotesApp

**Please add env file first**

A full-stack notes management web app built with **Next.js (frontend)** and **FastAPI (backend)**.  
It allows users to create, edit, and manage notes securely with JWT authentication and MongoDB Atlas as the database.

## Tech Stack

**Frontend**
- Next.js 14
- React
- Tailwind CSS

**Backend**
- Python 3.11
- FastAPI + Uvicorn
- MongoDB Atlas
- JWT Authentication

**DevOps**
- Docker & Docker Compose


**Run Full Project In Docker**
docker-compose up --build
Frontend → http://127.0.0.1:3000
Backend → http://127.0.0.1:8000


## Folder Structure
Mainfile
- backend/
  - main.py
  - models/
  - routes/
  - utils/
  - requirements.txt
  - .env
- frontend/
  - src/
    - app/
    - components/
  - public/
  - .env
  - .gitignore
  - package.json
docker-compose.yml
README.md


----- ----- ----
cd backend
**cmd for run--**

python -m venv venv
venv\Scripts\activate 
pip install -r requirements.txt


**.env**
MONGO_URI="mongodb+srv://sagarsharmaofficial0_db_user:%40notes@notes.v9yiyhw.mongodb.net/?retryWrites=true&w=majority"
DB_NAME="Notesdb"
JWT_SECRET="asdfghjpoiuydsfvhjiutrdrfghjiuyftvnmyfughij"
JWT_EXPIRE_MIN=60


**Run Backend**
uvicorn main:app --host 0.0.0.0 --port 8000
Access backend at → http://127.0.0.1:8000


**With Docker run**
docker-compose up --build backend


**---- ---- ----**
cd frontend
npm install
NEXT_PUBLIC_BASE_URL=http://127.0.0.1:8000
npm run dev

**With Docker run**
docker-compose up --build frontend


