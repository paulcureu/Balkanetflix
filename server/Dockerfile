
FROM node:20-bookworm AS builder


WORKDIR /usr/src/app


COPY package*.json ./

RUN npm install

COPY . .


RUN npx prisma generate


FROM node:20-bookworm

WORKDIR /usr/src/app


COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./


COPY --from=builder /usr/src/app .


EXPOSE 3000


USER node


CMD [ "node", "src/server.ts" ]