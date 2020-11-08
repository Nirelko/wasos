FROM node:12.10-alpine

# Install Chrome
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install all the dependencies for build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Copy the source files
COPY . .

# Exec the build, it will generate a dist folder
RUN npm run build

# Set app in production
RUN mv dist/ /usr
WORKDIR /usr/dist/server
COPY .env.* ./
COPY package*.json ./
RUN npm ci --only=production

# Clean src for minized container
RUN rm -rf /usr/src

# Expose production port
EXPOSE 80

# Start the server
CMD [ "node", "index.js" ]

