from fastapi import APIRouter
from typing import List, Set, Optional, Literal
from datetime import datetime

from .service import SubscriptionService
from .schemas import SubscriptionAction



router = APIRouter(
    prefix="/subscription",
    tags=["Подписки"],
)





@router.get("s/{user_id}")
async def get_user_queries(user_id: int):
    subscriptions = await SubscriptionService.find_all(user_id=user_id, is_active=True)
    return subscriptions


@router.get("/time/{subscription_id}")
async def get_update_time(subscription_id: int):
    return await SubscriptionService.find_by_id(subscription_id)


@router.patch("/time/{subscription_id}")
async def update_time(subscription_id: int):
    data = {'last_update_time': datetime.now()}
    await SubscriptionService.update(subscription_id, **data)


@router.patch("/{subscription_id}/{action}")
async def toggle_subscription(subscription_id: int, action: Literal['subscribe', 'unsubscribe']):
    data = {'is_active': action == 'subscribe'}
    await SubscriptionService.update(subscription_id, **data)


@router.get("/{user_id}/{query_id}")
async def get_subscription_id(user_id: int, query_id: int):
    result = await SubscriptionService.find_one_or_none(user_id=user_id, query_id=query_id)
    if result:
        return result.id
    return await SubscriptionService.add(
        user_id=user_id,
        query_id=query_id
    )









































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


