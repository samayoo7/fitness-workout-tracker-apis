# Base image
FROM node:18-alpine

# Install dependencies and PostgreSQL client
RUN apk add --no-cache postgresql-client

# Set working directory
WORKDIR /usr/src/app

# Install dependencies first (for caching)
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies and generate Prisma client
RUN npm install
RUN npx prisma generate

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose app port
EXPOSE 3000

# Set the default command
CMD ["npm", "start"]