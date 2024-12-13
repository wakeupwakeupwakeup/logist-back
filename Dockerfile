FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g pnpm@latest && pnpm install

COPY . .

RUN pnpm run build

RUN apt-get update && apt-get install -y postgresql postgresql-contrib

RUN service postgresql start && \
    su postgres -c "psql -c \"ALTER USER postgres WITH PASSWORD 'admin';\"" &&\
    su postgres -c "psql -c \"CREATE DATABASE logistic OWNER postgres;\""

EXPOSE 8080

CMD service postgresql start && pnpm run start:dev