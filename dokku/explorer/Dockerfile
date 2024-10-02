FROM node:22-alpine AS build

WORKDIR /build
RUN corepack enable

COPY explorer/package.json ./
RUN yarn set version 3.6.1
RUN yarn install

COPY explorer/ ./
RUN yarn vite:build

FROM pierrezemb/gostatic AS server
COPY --from=build /build/dist /srv/http/
ENTRYPOINT ["/goStatic", "-fallback", "/index.html"]
