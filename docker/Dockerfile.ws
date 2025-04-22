FROM node:20-alpine

WORKDIR /usr/src/app

COPY ./packages ./packages
COPY ./pnpm-lock.yaml  ./pnpm-lock.yaml
COPY ./pnpm-workspace.yaml  ./pnpm-workspace.yaml

COPY ./package.json ./package.json
COPY ./turbo.json ./turbo.json

COPY ./apps/ws-server ./apps/ws-server
RUN npm install -g pnpm
RUN pnpm install
RUN npm run db:generate

EXPOSE 8090

CMD ["npm", "run", "start:ws"]