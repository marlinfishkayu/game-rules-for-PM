# Build stage
FROM node as build

WORKDIR /release
ADD . .

RUN yarn install
RUN yarn run build

# Production image
FROM pgpg/infra-nginx:latest as production
COPY --from=build /release/dist /usr/share/nginx/html
ENV NGINX_TEMPLATE=static-local \
    NGINX_PORT=80 \
    NGINX_STATIC_ROOT=/usr/share/nginx/html/
