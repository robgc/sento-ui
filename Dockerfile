FROM node:10.16.0-alpine AS build-env

RUN set -eux \
    && mkdir -p /usr/src/app/dist

WORKDIR /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

RUN set -eux \
    && apk add --no-cache bash \
    && apk add --no-cache --virtual build-dep \
        git \
        make \
        gcc \
        g++ \
        python \
    && npm ci \
    && npm cache clean --force \
    && apk del build-dep

COPY . ./

RUN npm run build


FROM nginx:1.16.0-alpine

WORKDIR /usr/share/nginx/html

COPY --from=build-env /usr/src/app/dist ./

EXPOSE 80
