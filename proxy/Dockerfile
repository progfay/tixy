FROM node:16 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY tsconfig*.json ./
COPY src src
RUN npm run build

FROM node:16
ENV NODE_ENV=production
WORKDIR /usr/src/app
RUN chown node:node .
USER node
COPY --chown=node:node package*.json ./
RUN npm install
COPY --from=builder --chown=node:node /usr/src/app/dist/ dist/
EXPOSE 3000
ENTRYPOINT [ "node", "dist/app.js" ]
