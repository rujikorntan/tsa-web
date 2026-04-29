# syntax=docker/dockerfile:1.7

FROM node:22-bookworm-slim AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# --------- DEV STAGE ---------
FROM base AS dev
# Provide build args for dev mode as well
ARG CMS_URL=http://cms:1337
ARG PUBLIC_CMS_URL=http://localhost:1337
ENV CMS_URL=$CMS_URL
ENV PUBLIC_CMS_URL=$PUBLIC_CMS_URL

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD ["npm", "run", "dev", "--", "--host"]

# --------- BUILD STAGE ---------
FROM base AS build
ARG CMS_URL=http://cms:1337
ARG PUBLIC_CMS_URL=http://localhost:1337
ENV CMS_URL=$CMS_URL
ENV PUBLIC_CMS_URL=$PUBLIC_CMS_URL

COPY . .
RUN npm run build

# --------- RUNTIME STAGE ---------
FROM node:22-bookworm-slim AS runtime
WORKDIR /app

ENV HOST=0.0.0.0
ENV PORT=80
ENV NODE_ENV=production

ARG CMS_URL=http://cms:1337
ARG PUBLIC_CMS_URL=http://localhost:1337
ENV CMS_URL=$CMS_URL
ENV PUBLIC_CMS_URL=$PUBLIC_CMS_URL

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

EXPOSE 80
CMD ["node", "./dist/server/entry.mjs"]
