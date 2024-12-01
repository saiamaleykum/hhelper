from sqlalchemy import select, insert, and_, or_, func, delete, update
from datetime import date
from typing import List
from sqlalchemy.exc import IntegrityError

from database import async_session_maker, engine
from dao.base import BaseService

from .models import User


class UserService(BaseService):
    model = User

 
            
