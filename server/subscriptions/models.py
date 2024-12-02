import enum
from sqlalchemy import Column, Integer, Boolean, JSON, Enum, DateTime, func, String, ForeignKey, UniqueConstraint, BigInteger
from sqlalchemy.orm import relationship

from database import Base


class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, nullable=False)
    user_id = Column(BigInteger, ForeignKey('users.id'), nullable=False)
    query_id = Column(Integer, ForeignKey('queries.id'), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    last_update_time = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
        
    __table_args__ = (
        UniqueConstraint('user_id', 'query_id', name='uix_user_query'),
    )
