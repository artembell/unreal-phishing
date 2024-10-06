FROM node:20

# ENV DATABASE_URL=$DATABASE_URL
# ENV MONGO_DATABASE_URL=$MONGO_DATABASE_URL

EXPOSE 3000:3000

COPY ./backend /phishing-simulation-server
WORKDIR /phishing-simulation-server

RUN npm install
RUN npm run be:generate:prod
# RUN npm run be:migrate:prod
RUN npm run be:build:prod


ENTRYPOINT npm run be:migrate:prod && npm run be:start:prod
# CMD [ "npm", "run", "be:start:prod" ]
# CMD [ "tail", "-f", "/dev/null" ]