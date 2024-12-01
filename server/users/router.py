from fastapi import APIRouter, HTTPException
from typing import List, Set, Optional
from datetime import date
from contextlib import suppress

from .service import UserService
from .schemas import SUserCreate



router = APIRouter(
    prefix="/user",
    tags=["Пользователи"],
)


@router.post("")
async def add_user(user: SUserCreate):
    parameters = user.model_dump(exclude_unset=True)
    await UserService.add(**parameters)


@router.get("")
async def get_users():
    return await UserService.find_all()