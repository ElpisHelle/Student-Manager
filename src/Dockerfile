FROM node:20

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package.json ./
COPY package-lock.json package-lock.json ./

# This runs npm install (to install dependencies) on the host machine
RUN npm install

# Copy all files from the host to the container
COPY . .

# Expose port 3000 (you'll be visiting localhost:3030 to see your app)
EXPOSE 3000

# Run the start script
CMD ["npm", "run", "start"]
