from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

from .models import QueryType


# class SQueryVacancies(BaseModel):
#     query_id: int
#     vacancy_id: int
#     is_new: bool


class SQuery(BaseModel):
    id: int
    parameters: dict
    parameters_hash: str
    type: QueryType
    created_by: int
    created_at: datetime
    is_active: bool

class Item(BaseModel):
    id: str
    name: str


class SQueryParams(BaseModel):
    area: Optional[Item] = Field(None, description="Регион")
    text: Optional[str] = Field(None, description="Текст запроса")

class SQueryCreate(BaseModel):
    user_id: int
    query: SQueryParams