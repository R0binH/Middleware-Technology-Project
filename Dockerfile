# Use the official Node.js base image
FROM node:18

# Create and set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files into the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the code into the working directory
COPY . .

# Copy the .env file separately
COPY .env .env

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["npm", "run", "start"]
