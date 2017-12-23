FROM node:9.3-alpine as build
LABEL maintainer="Tomasz Janas"

WORKDIR /home/node
COPY package.json package-lock.json ./
RUN npm -q i

ARG GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_ID="$GOOGLE_CLIENT_ID"

COPY . .
RUN npm -s run build

FROM tjanas94/golang:1.9-alpine-arm32v6 as confd
LABEL maintainer="Tomasz Janas"

RUN apk --no-cache add make git \
  && mkdir -p /go/src/github.com/kelseyhightower \
  && git clone --branch v0.14.0 https://github.com/kelseyhightower/confd.git /go/src/github.com/kelseyhightower/confd \
  && cd /go/src/github.com/kelseyhightower/confd \
  && make \
  && apk del make git

FROM tjanas94/alpine:3.7-arm32v6
LABEL maintainer="Tomasz Janas"

RUN apk --no-cache add nginx
COPY --from=confd /go/src/github.com/kelseyhightower/confd/bin/confd /usr/local/bin/confd
RUN chmod +x /usr/local/bin/confd

COPY docker/nginx/run.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/run.sh

COPY docker/nginx/nginx.conf /etc/nginx
COPY docker/nginx/confd /etc/confd
COPY --from=build /home/node/dist /usr/src/app

EXPOSE 80 443
CMD ["run.sh"]
