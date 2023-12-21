FROM node:18-alpine AS build

WORKDIR /build
COPY website/ ./
RUN yarn install
RUN yarn build

FROM pierrezemb/gostatic as server
COPY --from=build /build/dist /srv/http/