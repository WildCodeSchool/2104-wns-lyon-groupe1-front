FROM node:15.14.0

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY src src 
COPY public public

CMD npm run start
