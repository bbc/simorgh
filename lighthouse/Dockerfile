FROM node:18-alpine

RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
    && apk add chromium

RUN npm install -g @lhci/cli@0.12.x

FROM scratch
COPY --from=0 . .

CMD ["lhci", "autorun", "--config=./lighthouse/lighthouserc.js"]