FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

# Собираем приложение для продакшен (формирует статику)
#RUN npm run build

# Экспонируем порт, который будет использоваться в контейнере (ПРИ ПРОДАКШЕН НЕ НУЖЕН)
EXPOSE 3000

# Запускаем приложение в режиме разработки
CMD ["npm", "start"]
