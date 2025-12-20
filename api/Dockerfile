FROM node:latest 

WORKDIR  /app 

# copy package json from host to inside container working directory 
COPY package*.json ./

# install deps install the container 
RUN npm install 

#Bundle app sources 
COPY . . 

RUN npm run build 

EXPOSE 3000 

CMD ["npm","run","start:dev"]


#############
#Production##
#############


