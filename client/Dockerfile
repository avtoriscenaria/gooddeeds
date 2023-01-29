FROM node:16

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3007

CMD ["npm", "start"]
