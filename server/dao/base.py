from sqlalchemy import select, insert, update
from sqlalchemy.exc import IntegrityError

from database import async_session_maker
from exceptions import AlreadyExists


class BaseService:
    model = None

    @classmethod
    async def find_by_id(cls, model_id: int):
        async with async_session_maker() as session:
            query = select(cls.model).filter_by(id=model_id)
            result = await session.execute(query)
            return result.scalar_one_or_none()

    @classmethod
    async def find_one_or_none(cls, **filter_by):
        async with async_session_maker() as session:
            query = select(cls.model).filter_by(**filter_by)
            result = await session.execute(query)
            return result.scalar_one_or_none()

    @classmethod
    async def find_all(cls, **filter_by):
        async with async_session_maker() as session:
            query = select(cls.model).filter_by(**filter_by)
            result = await session.execute(query)
            return result.scalars().all()
            # return result.mappings().all()

    @classmethod
    async def add(cls, **data):
        async with async_session_maker() as session:
            query = insert(cls.model).values(**data).returning(cls.model.id)
            try:
                result = await session.execute(query)
                await session.commit()
                print(f'[{cls.model.__qualname__}] Добавлена новая запись')
                return result.scalar() # возвращает id
            except IntegrityError:
                print(f'[{cls.model.__qualname__}] Такая запись уже существует')
                # raise AlreadyExists
            except Exception as e:
                pass
                # TODO ЛОГИРОВАНИЕ

    @classmethod
    async def update(cls, model_id: int, **data):
        async with async_session_maker() as session:
            query = (
                update(cls.model)
                .where(cls.model.id == model_id) 
                .values(**data)                 
            )
            await session.execute(query)
            await session.commit()

            
