from sqlalchemy.orm import Mapped, mapped_column

from db.session import Base

class Film(Base):
  __tablename__ = "film"
  film_id: Mapped[int] = mapped_column(primary_key=True)
  title: Mapped[str]
  release_year: Mapped[int]