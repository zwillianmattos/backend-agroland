FROM node:10.16.0
RUN npm install -g --unsafe-perm prisma2@2.0.0-preview-12

RUN mkdir /app
WORKDIR /app

ENV NODE_ENV development

COPY package*.json /app

COPY . /app

RUN npm install

RUN npm audit fix --force

EXPOSE 3000


RUN ["chmod", "+x", "./start.sh"]