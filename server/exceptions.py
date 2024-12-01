from fastapi import HTTPException, status


RoomCannotBeBooked = HTTPException(
    status_code=status.HTTP_409_CONFLICT,
    detail="Не осталось свободных номеров"
)

AlreadyExists = HTTPException(
    status_code=status.HTTP_409_CONFLICT,
    detail="Такая запись уже существует"
)