FROM node:14.17-alpine as builder
LABEL maintainer="dev@lixinft.me"

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --ignore-scripts

COPY . .
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

FROM node:14.17-alpine as runner
WORKDIR /app
RUN addgroup -g 1001 appgroup
RUN adduser -D -u 1001 appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser

COPY --from=builder --chown=appuser:appgroup /app/ ./

EXPOSE 8000
CMD [ "yarn", "start:prod" ]
