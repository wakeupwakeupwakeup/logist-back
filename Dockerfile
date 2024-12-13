FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN pnpm install

COPY . .

RUN pnpm run build

# Открываем порт для приложения
EXPOSE 3000

# Команда запуска приложения
CMD ["pnpm", "run", "start:dev"]
