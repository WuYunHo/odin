FROM node:16

WORKDIR /app

ENV TZ="Asia/Shenzhen"

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

COPY package.json ./
RUN npm install --registry=https://registry.npm.taobao.org

COPY . .

EXPOSE 7001
CMD [ "pnpm", "dev" ]