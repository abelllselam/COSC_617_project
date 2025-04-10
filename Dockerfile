# Step 1: Build React frontend
FROM node:22-alpine AS build

WORKDIR /app

# Copy frontend and build
COPY frontend/ ./frontend/
RUN cd frontend && npm install && npm run build

# Copy backend and install deps
COPY backend/ ./backend/
RUN cd backend && npm install

# Step 2: Create final image
FROM node:22-alpine

WORKDIR /app

# Copy backend
COPY --from=build /app/backend ./backend

# Copy frontend build into backend's public folder (or serve manually in server.js)
COPY --from=build /app/frontend/dist ./frontend/dist

WORKDIR /app/backend

# Expose your backend port (e.g. 8080 or 3000)
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
