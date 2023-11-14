# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm install

# Bundle your app's source code inside the Docker image
COPY . .

# Make port available to the world outside this container
EXPOSE 3000

# Run the application when the container launches
CMD ["node", "arbitrageBot.js"]
