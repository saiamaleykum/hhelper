from pydantic import BaseModel, validator
from typing import Literal




class SubscriptionAction(BaseModel):
    action: Literal['subscribe', 'unsubscribe']