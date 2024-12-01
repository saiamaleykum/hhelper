from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class SUser(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str
    registered_at: datetime

class SUserCreate(BaseModel):
    id: int
    first_name: str
    username: Optional[str] = None
    last_name: Optional[str] = None