FROM node:alpine3.21

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . /app

EXPOSE 3000

CMD ["npm","start"]

