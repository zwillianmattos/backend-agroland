FROM node:alpine

RUN apk add --update bash && rm -rf /var/cache/apk/*

RUN apk add --update nodejs nodejs-npm

WORKDIR /usr/backend

COPY package*.json ./
RUN npm install --global

COPY . .

EXPOSE 3000

RUN ["chmod", "+x", "./start.sh"]