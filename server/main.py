from fastapi import FastAPI, Query, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from datetime import date
from pydantic import BaseModel, Field
import pika

from queries.router import router as router_queries
from users.router import router as router_users
from subscriptions.router import router as router_subscriptions


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Или укажите конкретные домены, например: ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],  # Разрешить все методы
    allow_headers=["*"],  # Разрешить все заголовки
)

app.include_router(router_queries)
app.include_router(router_users)
app.include_router(router_subscriptions)






def get_rabbitmq_channel():
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))  # localhost или ваш RabbitMQ сервер
    channel = connection.channel()
    return channel

@app.post("/send_message/")
async def send_message(message: str):
    channel = get_rabbitmq_channel()
    channel.queue_declare(queue='notification_queue')  # Убедитесь, что очередь существует
    channel.basic_publish(exchange='',
                          routing_key='notification_queue',
                          body=message)  # Сообщение, которое будет отправлено в очередь
    return {"status": "Message sent to queue"}



