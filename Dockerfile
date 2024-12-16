# Stage 1: Builder stage
FROM node:16-alpine AS builder

WORKDIR /app

# Install ALL dependencies (including devDependencies)
COPY package.json package-lock.json ./
RUN npm install

# Copy application files
COPY . .

# Build the application
RUN npm run build


# Stage 2: Runtime stage
FROM node:16-alpine

WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copy the built files from the builder stage
COPY --from=builder /app/build /app/build

# Set the environment
ENV NODE_ENV=production

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]