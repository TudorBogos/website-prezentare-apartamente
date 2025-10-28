FROM node:18-alpine
WORKDIR /usr/src/app

# Install deps
COPY package*.json ./
RUN npm install

# Copy app
COPY . .

EXPOSE 3000
CMD ["node", "server.js"]