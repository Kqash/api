FROM node:8

COPY ./ /api
WORKDIR /api

CMD /usr/local/bin/node /api/index.js

