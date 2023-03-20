FROM node:17

WORKDIR /usr/v1/src/index/app

COPY package.json .
RUN yarn install
COPY . .

EXPOSE 4001

CMD ["yarn", "run", "dev"]
