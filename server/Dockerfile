
#build

FROM node:20-bookworm AS builder


WORKDIR /usr/src/app


COPY package*.json ./

RUN npm install

COPY . .


RUN npx prisma generate

RUN npm run build

#production

FROM node:20-bookworm

WORKDIR /usr/src/app


COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./


COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma


EXPOSE 3000


USER node


CMD [ "node", "dist/server.js" ]