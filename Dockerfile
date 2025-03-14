# Step 1: Set up Node.js for backend and frontend
FROM node:16-alpine AS build

# Set the working directory for backend
WORKDIR /app/backend

# Copy backend package files and install dependencies
COPY backend/package*.json ./
RUN npm install

# Copy the backend source code and build the backend app
COPY backend/ .

# Install PM2 globally for running the backend with PM2
RUN npm install -g pm2

# Step 2: Set up the frontend (React app)
# Go back to the main directory and then into the frontend folder
WORKDIR /app/frontend

# Copy frontend package files and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy the frontend source code
COPY frontend/ .

# Build the frontend app (if needed for production, or just run it for dev)
RUN npm run build

# Step 3: Set up the final image with PM2 and Nginx

FROM nginx:1.23-alpine

# Install Node.js and npm (required for pm2)
RUN apk add --no-cache bash nodejs npm

# Install PM2 globally for running the backend with PM2
RUN npm install -g pm2

# Set up the backend
WORKDIR /app/backend

# Copy the backend build and run it with PM2
COPY --from=build /app/backend /app/backend
RUN pm2 start /app/backend/express.js --name "express-backend"

# Set up the frontend
WORKDIR /app/frontend

# Copy the frontend build output to Nginx folder for serving
COPY --from=build /app/frontend/build /usr/share/nginx/html

# Expose port 80 for serving the frontend and backend
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
