from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pika

from queries.router import router as router_queries
from users.router import router as router_users
from subscriptions.router import router as router_subscriptions


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],  
)

app.include_router(router_queries, prefix="/api")
app.include_router(router_users, prefix="/api")
app.include_router(router_subscriptions, prefix="/api")


# def get_rabbitmq_channel():
#     connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))  # localhost или ваш RabbitMQ сервер
#     channel = connection.channel()
#     return channel

# @app.post("/send_message/")
# async def send_message(message: str):
#     channel = get_rabbitmq_channel()
#     channel.queue_declare(queue='notification_queue')  # Убедитесь, что очередь существует
#     channel.basic_publish(exchange='',
#                           routing_key='notification_queue',
#                           body=message)  # Сообщение, которое будет отправлено в очередь
#     return {"status": "Message sent to queue"}



