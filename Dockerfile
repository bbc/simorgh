FROM node:12.18.4

RUN mkdir /workspace

WORKDIR /workspace

RUN git clone https://github.com/bbc/simorgh.git

WORKDIR /workspace/simorgh

RUN yarn install

EXPOSE 7080

CMD ["yarn", "dev"]
