#!/bin/bash

echo "🚀 Building shared package..."
cd packages/shared
bun install
bun run build

echo "🔨 Building backend..."
cd ../../apps/backend
bun install

echo "✅ Build completed!"

echo "🌐 Starting server..."
bun run start
