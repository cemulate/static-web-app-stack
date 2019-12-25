FROM node:13

COPY . /app

WORKDIR /app

RUN npm install && \
    npm run build

ENV NODE_ENV=production

ENTRYPOINT npm run $NODE_ENV