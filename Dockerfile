FROM node:25-alpine
WORKDIR /usr/src/app

# Install dependencies (includes dev deps in this non-prod image)
COPY package*.json ./
RUN npm install

# Copy the app
COPY . .

EXPOSE 3000
CMD ["npm", "run", "start"]
