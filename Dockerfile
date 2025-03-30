FROM node:alpine3.21

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -g nodemon

RUN npm install

COPY . .

ENV MONGODB_URI=${MONGODB_URI}
ENV JWT_SECRET=${JWT_SECRET}


EXPOSE 3000

CMD ["npm","start"]

