###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm i

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine AS build

ENV NODE_ENV dev

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine AS production
RUN apk update && apk add --no-cache aws-cli

RUN aws --version
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "/bin/sh","-c", "node --require ts-node/register /node_modules/typeorm/cli migration:run -d /dist/typeOrm.config.js && node /dist/src/main" ]
