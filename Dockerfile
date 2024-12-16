# Step 1: Build the frontend files
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application and build it
COPY . .
RUN npm run build

# Step 2: Prepare the built files for Nginx
FROM alpine:latest

# Create a directory to store the built files
WORKDIR /dist

# Copy the built frontend files from the builder stage
COPY --from=builder /app/dist /dist