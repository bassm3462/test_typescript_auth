FROM node:20.9.0
WORKDIR /auth
COPY package.json . 
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "node", "start" ]

