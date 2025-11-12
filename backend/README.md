
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


**Core Frameworks and Libraries**
 Package 

**fastapi**
 Main backend framework for building RESTful APIs
 **uvicorn[standard]** 
  ASGI web server used to run FastAPI 
 **pymongo** 
  MongoDB client for database operations 
 **python-dotenv** 
  Loads environment variables from `.env` 
   **passlib** 
    Password hashing and verification 
 **pyjwt** 
 JWT token creation and decoding for authentication 
**email-validator**  
Validates user email addresses 
 **pydantic[email]** 
 Data validation and request/response schema definitions

**Backend Key Features**
- User authentication (JWT)
- Notes CRUD operations
- MongoDB Atlas database integration
- Environment configuration via `.env`
- CORS setup for frontend communication
- Password encryption using Passlib

**.env**
MONGO_URI="mongodb+srv://sagarsharmaofficial0_db_user:%40notes@notes.v9yiyhw.mongodb.net/?retryWrites=true&w=majority"
DB_NAME="Notesdb"
JWT_SECRET="asdfghjpoiuydsfvhjiutrdrfghjiuyftvnmyfughij"
JWT_EXPIRE_MIN=60

