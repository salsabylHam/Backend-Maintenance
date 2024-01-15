###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm i

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production
RUN apk add --no-cache \
    python3 \
    py3-pip \
    &&  python3 -m venv /path/to/venv \
    && . /path/to/venv/bin/activate \
    && pip3 install --upgrade pip \
    && pip3 --no-cache-dir install --upgrade awscli \
    && rm -rf /var/cache/apk/*

RUN aws --version
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "/bin/sh","-c", "node --require ts-node/register /node_modules/typeorm/cli migration:run -d /dist/typeOrm.config.js && node /dist/src/main" ]
