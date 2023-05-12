FROM docker.artifactory.tapsi.tech/tools/node-base:14-slim

LABEL authors="aliEbrahimi"

WORKDIR app

COPY package.json ./

RUN yarn install --frozen-lockfile

COPY . .

CMD [ "node", "index.js" ]