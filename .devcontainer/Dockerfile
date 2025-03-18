FROM node:20-alpine
USER root
RUN apk add --no-cache git openssh
RUN mkdir -p /home/node/.npm-global
RUN chown -R node:node /home/node
RUN npm config -g set prefix "/home/node/.npm-global"
USER node
ENV PATH="/home/node/.npm-global/bin:${PATH}"
RUN npm install -g npm@latest
