from sqlalchemy import Column, BigInteger, String, DateTime, func, Boolean
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(BigInteger, primary_key=True, nullable=False)
    username = Column(String(32))
    first_name = Column(String(64), nullable=False)
    last_name = Column(String(64))
    registered_at = Column(DateTime, server_default=func.now(), nullable=False)

    # queries = relationship("Query", back_populates="created_by_user")
    queries = relationship("Query", secondary="subscriptions", back_populates="users")
