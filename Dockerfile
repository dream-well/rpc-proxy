# syntax=docker/dockerfile:1

FROM node:16-alpine

ENV NODE_ENV=production

ENV TARGET=http://monero.dyni.net:18081
ENV PORT=18081

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "main.js" ]
