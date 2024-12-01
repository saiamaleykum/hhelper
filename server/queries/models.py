import enum
from sqlalchemy import Column, Integer, Boolean, JSON, Enum, DateTime, func, String, ForeignKey, UniqueConstraint, BigInteger
from sqlalchemy.orm import relationship

from database import Base


# class QueryVacancies(Base):
#     __tablename__ = "query_vacancies"

#     query_id = Column(Integer, primary_key=True)
#     vacancy_id = Column(Integer, primary_key=True)
#     is_new = Column(Boolean, default=True)

class QueryType(enum.Enum):
    PERSONAL = "personal"
    POPULAR = "popular"


class Query(Base):
    __tablename__ = "queries"

    id = Column(Integer, primary_key=True, nullable=False)
    parameters = Column(JSON, nullable=False)
    parameters_hash = Column(String(64), unique=True, nullable=False)
    type = Column(Enum(QueryType), default=QueryType.PERSONAL, nullable=False)
    created_by = Column(BigInteger, ForeignKey('users.id'), nullable=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)

    created_by_user = relationship("User", back_populates="queries")
    users = relationship("User", secondary="subscriptions", back_populates="queries")



