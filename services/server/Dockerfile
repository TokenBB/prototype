FROM node:carbon-alpine as development

USER node
RUN mkdir -p /home/node/server
WORKDIR /home/node/server
COPY ./package*.json ./
RUN npm install
COPY . .

FROM development as production

USER node
WORKDIR /home/node/server
CMD ["node", "src"]