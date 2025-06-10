# Use Bun official image
FROM oven/bun:1

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./
COPY packages/shared/package.json packages/shared/
COPY apps/backend/package.json apps/backend/

# Install dependencies
RUN bun install

# Copy source code
COPY packages/shared/ packages/shared/
COPY apps/backend/ apps/backend/

# Build shared package
RUN cd packages/shared && bun run build

# Expose port
EXPOSE 3001

# Start the application
CMD ["bun", "run", "apps/backend/src/index.ts"]
