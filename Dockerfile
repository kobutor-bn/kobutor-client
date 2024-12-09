# Builder stage
FROM node:16-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project
COPY . .
RUN ls -l /  # Debug: Verify files are copied

# Build the project
RUN npm run build
RUN ls -l /app/dist  # Debug: Verify dist directory is created

# Serve stage
FROM nginx:alpine
COPY --from=builder /app/dist/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]