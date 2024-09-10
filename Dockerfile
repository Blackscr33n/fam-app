# Use an official Node.js runtime as the base image
FROM node:20 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=build app/dist/fam-app /usr/share/nginx/html

# Expose a port (if your application needs it)
EXPOSE 3000