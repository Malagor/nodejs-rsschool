FROM node:14.17-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN mkdir -p ./logs/
RUN npm install
COPY . .
RUN npx tsc
CMD [ "node", "./build/server.js" ]
