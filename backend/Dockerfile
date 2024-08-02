FROM node:alpine

WORKDIR /app

COPY ./ ./

RUN npm install -g pnpm && pnpm install

CMD ["pnpm", "run", "dev"]
