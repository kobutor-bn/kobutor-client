# Stage 1: Build stage
FROM node:16-alpine AS builder

WORKDIR /app

# Install dependencies (production-only)
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copy application files
COPY . .

# Build the application
RUN npm run build


# Stage 2: Final runtime stage
FROM node:16-alpine

WORKDIR /app

# Copy only the build output and production dependencies
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist

# Set the environment
ENV NODE_ENV=production

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]