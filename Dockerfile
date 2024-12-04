FROM node:16-alpine AS builder
WORKDIR /app
# Install dependencies
COPY package.json package-lock.json ./
RUN npm install
# Copy source code and build
COPY . .
RUN npm run build
# Copy build output to Nginx's HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html
# Expose port
EXPOSE 3000
CMD ["npm", "start"]