FROM node:14.17-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN mkdir -p ./logs/
RUN npm install
COPY . .
CMD [ "npm", "run", "start" ]
