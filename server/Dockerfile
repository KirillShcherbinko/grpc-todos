FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install

COPY src ./src
COPY ../proto ./proto

RUN bun run gen:proto

EXPOSE 50051

CMD ["bun", "run", "dev"]
