FROM node:16-alpine
EXPOSE 8080 3000

WORKDIR /home/node

RUN set -x
RUN apk --update add tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    echo "Asia/Tokyo" > /etc/timezone && \
    apk del tzdata
RUN apk add sqlite

COPY ./package*.json ./
RUN npm ci

COPY ./config ./config
COPY ./app-server/src ./app-server/src

COPY ./webpack.config.js ./webpack.config.js
COPY ./app-client/src ./app-client/src
RUN chown -R node:node ./app-client
RUN npm run build

CMD npm start
