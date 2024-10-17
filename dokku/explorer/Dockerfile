FROM node:18-alpine AS build

WORKDIR /build

COPY explorer/package.json ./
RUN yarn install

COPY explorer/ ./
RUN yarn vite:build

FROM pierrezemb/gostatic AS server
COPY --from=build /build/dist /srv/http/
ENTRYPOINT ["/goStatic", "-fallback", "/index.html"]
