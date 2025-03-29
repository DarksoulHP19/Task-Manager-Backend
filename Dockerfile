FROM node:alpine3.21

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENV MONGO_URI=${MONGO_URI}
ENV JWT_SECRET=${JWT_SECRET}


EXPOSE 3000

CMD ["npm","start"]

