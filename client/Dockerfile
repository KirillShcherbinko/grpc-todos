FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install

COPY src ./src
COPY ../proto ./proto

RUN bun run gen:proto

EXPOSE 3000

CMD ["bun", "run", "dev"]
