# Base image
FROM node:18-alpine

# File Author / Maintainer
LABEL com.walidnewaz.image.authors="mdwalid@gmail.com"

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev

# Install Gatsby CLI
# RUN npm install -g gatsby-cli

# Copy source code
COPY . .

# Expose port
EXPOSE 8000

# Build the app
RUN npm run build

# Set environment variables
ENV NODE_ENV=production
ENV GATSBY_SERVER_PORT=8000
ENV GATSBY_SERVER_HOST=0.0.0.0
ENV GATSBY_SERVER_LOG_LEVEL=debug

# Start the app
ENTRYPOINT ["npm", "start"]

