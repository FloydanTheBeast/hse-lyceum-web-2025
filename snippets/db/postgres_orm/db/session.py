from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from core.config import DB_URL

engine = create_engine(
    DB_URL,
)

Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()