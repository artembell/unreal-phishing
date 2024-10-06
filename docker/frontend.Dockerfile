FROM node:20 as build

COPY ./frontend /phishing-simulation-client

WORKDIR /phishing-simulation-client
RUN npm install
RUN npm run fe:build:prod

FROM caddy:2.8.4
WORKDIR /code/static
COPY --from=build /phishing-simulation-client/dist /code/static