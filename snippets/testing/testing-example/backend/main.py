from datetime import datetime, timedelta
from typing import List, Optional

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    create_engine,
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session, relationship, sessionmaker

SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

DATABASE_URL = "sqlite:///./todos.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    todos = relationship("Todo", back_populates="owner")


class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="todos")


Base.metadata.create_all(bind=engine)


class UserCreate(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TodoCreate(BaseModel):
    title: str


class TodoUpdate(BaseModel):
    title: Optional[str] = None
    completed: Optional[bool] = None


class TodoOut(BaseModel):
    id: int
    title: str
    completed: bool

    class Config:
        orm_mode = True


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def get_password_hash(password):
    return pwd_context.hash(password)


def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()

    expire = datetime.utcnow() + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise credentials_exception

    return user


app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/register", response_model=Token)
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.username == user.username).first()

    if existing:
        raise HTTPException(400, "User already exists")

    print(user.username, user.password)

    new_user = User(
        username=user.username,
        password=get_password_hash(user.password),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token({"sub": new_user.username})

    return {"access_token": token, "token_type": "bearer"}


@app.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.username == form_data.username).first()

    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(400, "Incorrect username or password")

    token = create_access_token({"sub": user.username})

    return {"access_token": token, "token_type": "bearer"}


@app.get("/todos", response_model=List[TodoOut])
def get_todos(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return db.query(Todo).filter(Todo.owner_id == user.id).all()


@app.post("/todos", response_model=TodoOut)
def create_todo(
    todo: TodoCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    new_todo = Todo(title=todo.title, owner_id=user.id)

    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)

    return new_todo


@app.patch("/todos/{todo_id}", response_model=TodoOut)
def update_todo(
    todo_id: int,
    todo: TodoUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    db_todo = (
        db.query(Todo).filter(Todo.id == todo_id, Todo.owner_id == user.id).first()
    )

    if not db_todo:
        raise HTTPException(404, "Todo not found")

    if todo.title is not None:
        db_todo.title = todo.title

    if todo.completed is not None:
        db_todo.completed = todo.completed

    db.commit()
    db.refresh(db_todo)

    return db_todo


@app.delete("/todos/{todo_id}")
def delete_todo(
    todo_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)
):
    db_todo = (
        db.query(Todo).filter(Todo.id == todo_id, Todo.owner_id == user.id).first()
    )

    if not db_todo:
        raise HTTPException(404, "Todo not found")

    db.delete(db_todo)
    db.commit()

    return {"ok": True}


@app.delete("/todos")
def clear_completed(
    db: Session = Depends(get_db), user: User = Depends(get_current_user)
):
    db.query(Todo).filter(Todo.owner_id == user.id, Todo.completed == True).delete()

    db.commit()

    return {"ok": True}


@app.patch("/todos")
def toggle_all(
    completed: bool,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    db.query(Todo).filter(Todo.owner_id == user.id).update({"completed": completed})

    db.commit()

    return {"ok": True}
