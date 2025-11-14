from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column

from db.session import Base

class Actor(Base):
  __tablename__ = "actor"
  actor_id: Mapped[int] = mapped_column(primary_key=True)
  first_name: Mapped[str]
  last_name: Mapped[str]
  last_update: Mapped[datetime] = mapped_column(default=datetime.utcnow)