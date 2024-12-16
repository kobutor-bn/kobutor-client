# Step 1: Build the frontend files
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application and build it
COPY . .
RUN npm run build

# Stage 2: Production-ready container
FROM alpine:3.18

WORKDIR /app

# Copy build artifacts from the builder stage
COPY --from=builder /app/dist /app/dist
RUN chmod -R 755 /app/dist

# Expose the build folder for the central Nginx server
VOLUME /app/dist