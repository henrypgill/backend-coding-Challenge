
FROM oven/bun:1 as base
WORKDIR /usr/app

FROM base AS install
COPY package.json bun.lockb tsconfig.json ./
RUN bun install

FROM install AS prerelease
COPY . .


EXPOSE 4000
CMD ["bun", "--watch", "./src/index.ts"]
