from sqlalchemy import select, insert, and_, or_, func, delete, update
from sqlalchemy.orm import joinedload
from datetime import date
from typing import List

from database import async_session_maker, engine
from dao.base import BaseService

from queries.models import Query
from subscriptions.models import Subscription
from .schemas import QueryType


class QueryService(BaseService):
    model = Query


    @classmethod
    async def find_all_popular(cls):
        async with async_session_maker() as session:
            query = select(Query.id, Query.parameters).filter_by(type=QueryType.POPULAR)
            result = await session.execute(query)
            return result.mappings().all()
        
    @classmethod
    async def find_by_hash(cls, hash: str):
        async with async_session_maker() as session:
            query = select(cls.model).filter_by(parameters_hash=hash)
            result = await session.execute(query)
            return result.scalar_one_or_none()
        

    # @classmethod
    # async def subscribe(cls, user_id: str):
    #     async with async_session_maker() as session:
    #         query = insert(cls.model).values(**data)
            
    

# class QueryVacanciesService(BaseService):
#     model = QueryVacancies

#     @classmethod
#     async def add(
#         cls,
#         query_id: int,
#         vacancy_ids: List[int]
#     ):
#         async with async_session_maker() as session:
#             values_to_insert = [{"query_id": query_id, "vacancy_id": vacancy_id, "is_new": False} for vacancy_id in vacancy_ids]
#             add_query_vacancies = insert(QueryVacancies).values(values_to_insert)

#             # print(add_query_vacancies.compile(engine, compile_kwargs={"literal_binds": True}))

#             await session.execute(add_query_vacancies)
#             await session.commit()
#             return len(vacancy_ids) 
     

#     @classmethod
#     async def update(
#         cls,
#         query_id: int,
#         added_ids: List[int],
#         removed_ids: List[int]
#     ):
#         async with async_session_maker() as session:
#             values_to_insert = [{"query_id": query_id, "vacancy_id": vacancy_id} for vacancy_id in added_ids]
#             async with session.begin():
#                 stmt = update(QueryVacancies).where(QueryVacancies.is_new==True).values(is_new=False)
#                 await session.execute(stmt)

#                 if added_ids:
#                     add_query_vacancies = insert(QueryVacancies).values(values_to_insert)
#                     await session.execute(add_query_vacancies)

#                 if removed_ids:
#                     stmt = delete(QueryVacancies).where(QueryVacancies.vacancy_id.in_(removed_ids))
#                     await session.execute(stmt)

#                 # # print(add_query_vacancies.compile(engine, compile_kwargs={"literal_binds": True}))

#                 # await session.commit()
#             # return True