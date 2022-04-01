FROM node:12.18.4

WORKDIR /app

COPY package.json .

# We should not Cache the lock file, but yarn install fails if I don't?
# COPY yarn.lock ./

RUN yarn install

COPY . .

ENV PORT=7080

EXPOSE 7080

CMD ["yarn", "dev"]
