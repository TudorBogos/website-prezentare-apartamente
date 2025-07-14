# 1) Pick a lean Node image
FROM node:18-alpine

# 2) Work inside /usr/src/app
WORKDIR /usr/src/app

# 3) Copy manifest + lockfile & install deps
COPY package*.json ./
RUN npm install

# 4) Copy the rest of your code (server.js, seed.js, public/, etc.)
COPY . .

# 5) Expose your app port
EXPOSE 3000

# 6) Seed DB then start the server
ENTRYPOINT ["./docker-entrypoint.sh"]
