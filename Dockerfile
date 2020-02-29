FROM node:current-slim AS build
WORKDIR /usr/kaz/app
COPY . .
WORKDIR /usr/kaz/app/backend
RUN yarn install
RUN yarn build
WORKDIR /usr/kaz/app/ui
RUN yarn install
RUN yarn build

FROM node:current-slim
ENV NODE_ENV=production
WORKDIR /usr/kaz
COPY --from=build /usr/kaz/app/backend/build app
WORKDIR /usr/kaz/app
COPY --from=build /usr/kaz/app/ui/build public
COPY --from=build /usr/kaz/app/backend/package.json package.json
COPY --from=build /usr/kaz/app/backend/yarn.lock yarn.lock
RUN yarn install --production && yarn cache clean

EXPOSE 80
CMD ["node", "server.js"]