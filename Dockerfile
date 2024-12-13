FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm run build

RUN apt-get update && apt-get install -y postgresql postgresql-contrib

RUN service postgresql start && \
    su postgres -c "psql -c \"CREATE USER logist_user WITH PASSWORD 'admin';\"" && \
    su postgres -c "psql -c \"CREATE DATABASE logistc_db OWNER logist_user;\""

EXPOSE 3000
EXPOSE 5432

CMD pg_ctl start -D /var/lib/postgresql/data && pnpm run start:dev