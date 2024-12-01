from fastapi import APIRouter
from typing import List, Set, Optional
from datetime import date

from subscriptions.service import SubscriptionService
from .service import QueryService
from .schemas import SQueryCreate
from .utils import get_hash

router = APIRouter(
    prefix="/query",
    tags=["Запросы"],
)


@router.post("")
async def save_query(query_params: SQueryCreate):
    parameters = query_params.query.model_dump(exclude_unset=True)
    parameters_hash = get_hash(parameters)
    
    query = await QueryService.find_by_hash(parameters_hash)
    if query:
        query_id = query.id
    else:
        query_id = await QueryService.add(
            created_by=query_params.user_id,
            parameters=parameters,
            parameters_hash=parameters_hash
        )
    print("\tID: ", query_id)

    result = await SubscriptionService.find_one_or_none(
        user_id=query_params.user_id,
        query_id=query_id
    )

    if result:
        await SubscriptionService.update(result.id, is_active=True)
    else:
        await SubscriptionService.add(
            user_id=query_params.user_id,
            query_id=query_id
        )



@router.get("/popular")
async def get_popular_queries():
    return await QueryService.find_all_popular()
    # return popular_queries












































# @router.get("")
# async def get_bookings() -> list[SBooking]:
#     return await BookingService.find_all()


# @router.get("/{booking_id}")
# async def get_booking(booking_id: int) -> SBooking:
#     return await BookingService.find_by_id(booking_id)

# @router.post("")
# async def add_query(
#     query_id: int, 
#     vacancy_ids: List[int]
# ):
#     return await QueryService.add(query_id, vacancy_ids)


# @router.put("")
# async def add_query(
#     query_id: int, 
#     new_vacancy_ids: List[int]
# ):
#     current_vacancies = await QueryService.find_all(query_id=query_id)
#     current_vacancy_ids = [vacancy.vacancy_id for vacancy in current_vacancies]

#     added_ids = list(set(new_vacancy_ids) - set(current_vacancy_ids))
#     removed_ids = list(set(current_vacancy_ids) - set(new_vacancy_ids))

#     await QueryService.update(query_id, added_ids, removed_ids)

#     return added_ids, removed_ids


