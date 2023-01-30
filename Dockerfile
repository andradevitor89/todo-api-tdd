FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

## Needed if you are using Docker only (not Docker Compose)
EXPOSE 8000
CMD [ "npm","run", "start" ]