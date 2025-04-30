# Keeping Render Free Tier Services Awake

Render’s **free tier** automatically pauses services when inactive for 15 minutes. To prevent this, you can use a **pinging service** like UptimeRobot or a scheduled GitHub Action to keep it active.

---

## Using UptimeRobot

[UptimeRobot](https://uptimerobot.com/) is a free monitoring tool that pings your Render service periodically.

### **Steps to Set Up UptimeRobot**
1. **Sign Up** at [UptimeRobot](https://uptimerobot.com/).
2. **Log in** and click **"Add New Monitor"**.
3. Configure the monitor:
   - **Monitor Type:** Select **"HTTP(s)"**.
   - **Friendly Name:** (e.g., "Render Keep Alive").
   - **URL or IP:** Enter your **Render service URL** (e.g., `https://video-app-cvuf.onrender.com`).
   - **Monitoring Interval:** Set to **5 minutes** (shortest free interval).
   - **Alert Contacts:** (Optional for notifications).
4. Click **"Create Monitor"**.

### **How It Works**
Pings your Render service every **5 minutes** to prevent auto-pausing.
Notifies you if your service goes down.

## CI/CD Integration with CircleCI

You can also integrate **Render’s Deploy Hook** in **CircleCI** to trigger deployments automatically.

### **1️⃣ Add Deploy Hook to CircleCI**
1. Go to **CircleCI Dashboard** → Select your project.
2. Navigate to **Project Settings** → **Environment Variables**.
3. Add:
   - **Name:** `RENDER_DEPLOY_HOOK`
   - **Value:** *(Paste your private Deploy Hook URL from Render)*
4. Save changes.

### **2️⃣ Modify `.circleci/config.yml`**
```yaml
version: 2.1

jobs:
  docker:
    docker:
      - image: cimg/base:current
    steps:
      - checkout
      - setup_remote_docker
      - run:
          name: Login to Docker Hub
          command: |
            echo "$DOCKER_TOKEN" | docker login -u "$DOCKER_USERNAME" --password-stdin
      - run:
          name: Build and Push Docker Image
          command: |
            docker build -t bwilfong122/video_app:latest frontend
            docker push bwilfong122/video_app:latest
      - run:
          name: Trigger Render Deployment
          command: |
            curl -X POST "$RENDER_DEPLOY_HOOK"

workflows:
  version: 2
  docker-workflow:
    jobs:
      - docker
```
## Dockerfile Explanation

This `Dockerfile` defines the steps for building and serving your app with **Node.js** for building and **Nginx** for serving the built application. Below is a step-by-step breakdown:

# Step 1: Use the Node.js image to build the app
FROM node:16-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the app
RUN npm run build

# Step 2: Use Nginx to serve the built app
FROM nginx:1.23-alpine

# Copy the build output to the Nginx HTML folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]