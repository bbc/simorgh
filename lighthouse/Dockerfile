FROM node:22-alpine

RUN apk add chromium

RUN npm install -g @lhci/cli@0.14.x

FROM scratch
COPY --from=0 . .

CMD ["lhci", "autorun", "--config=./lighthouse/lighthouserc.js"]