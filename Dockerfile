FROM node:16.14.0-slim AS development

RUN npm i -g @nestjs/cli@8.1.4

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn add glob rimraf

RUN yarn install

COPY . .

RUN yarn build


FROM node:16.14.0-slim as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY --from=development /usr/src/app/dist ./dist

CMD yarn start:${STAGE}