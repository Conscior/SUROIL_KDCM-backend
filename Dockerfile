FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=development PORT=3500 DB_HOST='192.168.0.1' DB_PORT=5432 DB_USER='postgres' DB_PASSWORD='postgres'

EXPOSE 3500

CMD ["npm", "start"]
