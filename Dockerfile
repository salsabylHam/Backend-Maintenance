###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:16-alpine AS development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm i
RUN npm i @nestjs/cli

COPY --chown=node:node . .


CMD [ "npm", "start:dev" ]

###################
# BUILD FOR PRODUCTION
###################

FROM development AS build

RUN npm run build

###################
# PRODUCTION
###################

FROM node:16-alpine AS production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist

ENV NODE_ENV=production

RUN npm ci --no-cache --only=production \
    && rm -rf /usr/src/app/.npm \
    && chown -R node:node /usr/src/app

USER node

CMD [ "node", "dist/main.js" ]
