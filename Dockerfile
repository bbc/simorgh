FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 7080
RUN npm run build:heroku
CMD ["npm", "start"]
