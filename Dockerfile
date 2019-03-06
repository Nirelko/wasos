FROM node:10.15-alpine

# Install all the packges for producation
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Copy the source files
COPY . .

# Generate the build, it will generate a dist folder
RUN npm run build


# Set app in production
RUN mv dist/ /usr
WORKDIR /usr/dist/server
COPY .env.* ./
COPY package*.json ./
RUN npm ci --only=production

# Clean src for minize container
RUN rm -rf /usr/src

# Expose production port
EXPOSE 80

# Start the server
CMD [ "node", "index.js" ]

