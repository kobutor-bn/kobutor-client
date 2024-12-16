# Stage 1: Build stage
FROM node:16-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application files and build the app
COPY . .
RUN npm run build

# Stage 2: Production-ready container
FROM alpine:3.18

WORKDIR /app

# Copy build artifacts from the builder stage
COPY --from=builder /app/dist /app/dist

# Expose the build folder for the central Nginx server
VOLUME /app/dist