import { Bot, Context, InlineKeyboard } from "grammy";
import dotenv from 'dotenv';
import amqp from 'amqplib';

dotenv.config({ path: './.env' });

export const bot: Bot<Context> = new Bot(process.env.BOT_TOKEN!);

// Подключение к RabbitMQ
async function connectRabbitMQ() {
    const connection = await amqp.connect('amqp://localhost'); // Укажите правильный URL RabbitMQ
    const channel = await connection.createChannel();
    await channel.assertQueue('notification_queue', {
        durable: false,  // используйте false, если очередь уже существует с таким параметром
    });

    // Слушаем очередь
    channel.consume('notification_queue', (msg) => {
        if (msg !== null) {
            const message = msg.content.toString();
            console.log('Received message:', message);

            // Отправка уведомления в Telegram
            bot.api.sendMessage(631638527, message); // Замените на правильный chat_id

            channel.ack(msg); // Подтверждаем получение сообщения
        }
    });
}



bot.command("start", async (ctx) => {
    if (!ctx.from) return;

    const keyboard = new InlineKeyboard().url(
        "Open app",
        process.env.WEB_APP_URL!
    );

    await ctx.replyWithPhoto(
        String(process.env.FILE_ID),
        {
            caption: "📎 Here you can view salaries and vacancies.",
            reply_markup: keyboard,
        }
    )
});



(async () => {
    try {
        // await bot.api.setWebhook(process.env.WEBHOOK_URL!)
        // await bot.init()
        connectRabbitMQ();
        await bot.start();
        console.log('Bot is running');

    } catch (err) {
        console.error('Произошла ошибка:', err);
        process.exit(1);
    }
})();

