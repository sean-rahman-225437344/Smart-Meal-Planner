FROM node:18

WORKDIR /usr/src/app/server

COPY server/package*.json ./

RUN npm install --production

COPY . /usr/src/app

EXPOSE 4000

CMD ["node", "src/index.js"]
