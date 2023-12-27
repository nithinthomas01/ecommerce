# Use a base image with Node.js and npm installed
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the entire app to the container
COPY . .

RUN npm install

# Build the React app
RUN npm run build

# Expose the app's port (change 3000 to the port your React app uses, if different)
EXPOSE 8085

# Define the command to run your app
CMD ["npm", "start"]
