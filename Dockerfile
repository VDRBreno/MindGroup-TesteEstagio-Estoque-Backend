FROM node:20 AS build

COPY /src /app/src
COPY /package*.json /app
COPY tsconfig*.json /app

WORKDIR /app

RUN npm install
RUN npm run build

FROM node:20 AS production

COPY /keys /app/keys
COPY /prisma /app/prisma
COPY package*.json /app

WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/package-lock.json ./package-lock.json

RUN npm ci --omit=dev

RUN apt update && \
  wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
  apt install -y wget netcat-traditional && \
  chmod +x /usr/bin/wait-for