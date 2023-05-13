FROM docker.artifactory.tapsi.tech/tools/node-base:14-slim

LABEL authors="aliEbrahimi"

WORKDIR app

COPY . .

RUN yarn install --frozen-lockfile  --prod

CMD [ "node", "index.js" ]