# Builder stage
FROM node:16-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all source files
COPY . .

# Build the application
RUN npm run build

# Use a minimal image for the final stage
FROM node:16-alpine AS final

WORKDIR /app/dist

# Copy the build files from the builder stage
COPY --from=builder /app/build .

# Expose the port (Optional: Only for dev testing)
EXPOSE 3000

## Builder stage
#FROM node:16-alpine AS builder
#
#EXPOSE 3000
#WORKDIR /app
#
## Install dependencies
#COPY package.json package-lock.json ./
#RUN npm install
#
## Copy and run
#COPY . .
#RUN npm run build