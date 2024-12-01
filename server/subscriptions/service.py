from sqlalchemy import select, insert, and_, or_, func, delete, update
from sqlalchemy.orm import joinedload
from datetime import date
from typing import List

from database import async_session_maker, engine
from dao.base import BaseService

from queries.models import Query
from subscriptions.models import Subscription

from queries.models import QueryType
        
class SubscriptionService(BaseService):
    model = Subscription

    @classmethod
    async def find_all(cls, **filter_by):
        async with async_session_maker() as session:
            query = select(
                Subscription.id,
                Query.parameters
                # Subscription.__table__.columns, 
                # Query.__table__.columns
            ).filter_by(**filter_by).join(Query).filter_by(type=QueryType.PERSONAL)
            result = await session.execute(query)
            return result.mappings().all()

