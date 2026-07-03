from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta, timezone

pwd_context = CryptContext(schemes=["bcrypt"])
SECRET_KEY = 'change this later'
ALGORITHM = "HS256"

def hash_password(password: str): 
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password:str) -> bool: 
    return pwd_context.verify(plain_password, hashed_password)

def create_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(hours=24)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str) -> dict:
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])