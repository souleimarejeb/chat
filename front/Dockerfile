
FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

RUN npm install -g @angular/cli@16.2.16

COPY  . .

EXPOSE 4200 

CMD ["npm","start"]