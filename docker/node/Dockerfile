FROM tjanas94/node:9.3-alpine-arm32v6
LABEL maintainer="Tomasz Janas"

WORKDIR /home/node
COPY docker/node/run.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/run.sh

USER node
COPY server/package.json server/package-lock.json ./
RUN  npm -q i

COPY server .

CMD ["run.sh"]
