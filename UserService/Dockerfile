# Stage 1: Install dependencies
FROM node:22-alpine AS dependencies

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Stage 2: Runtime stage
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy production dependencies from the first stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy the application code
COPY . .

# Expose the application port
EXPOSE 9000

# Command to run the application
CMD ["node", "index.js"]
