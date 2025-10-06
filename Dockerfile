FROM node:22-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run postinstall

RUN npm run build

FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /usr/src/app/dist ./dist

COPY --from=builder /usr/src/app/prisma ./prisma

COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 3000

CMD ["node", "dist/core/server.js"]
