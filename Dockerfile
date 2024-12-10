# Builder stage
FROM node:16-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy and run
COPY . .
RUN npm run build