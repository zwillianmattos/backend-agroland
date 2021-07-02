FROM node:10.16.0
# RUN npm install -g --unsafe-perm prisma2@2.0.0-preview-12

RUN mkdir /app
WORKDIR /app

ENV NODE_ENV development

COPY package*.json /app

RUN npm install -g nodemon@1.19.4
RUN npm install

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]