# Step 1: Set up Node.js for backend and frontend
FROM node:22-alpine AS build

# Set up backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
RUN npm install -g pm2

# Set up frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Step 2: Set up Nginx
FROM nginx:1.23-alpine
RUN apk add --no-cache bash nodejs npm
RUN npm install -g pm2

# Backend setup
WORKDIR /app/backend
COPY --from=build /app/backend /app/backend
RUN pm2 start /app/backend/express.js --name "express-backend"

# Frontend setup
WORKDIR /app/frontend
COPY --from=build /app/frontend/dist /usr/share/nginx/html 

# Expose port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
