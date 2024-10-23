FROM node:lts

WORKDIR /app

RUN apt update && apt install -y netcat-traditional

COPY package*.json ./

RUN npm install

COPY . .

COPY start.sh ./

RUN chmod +x start.sh


EXPOSE 3000

RUN npx prisma generate

RUN npm run build

CMD ["./start.sh"]
