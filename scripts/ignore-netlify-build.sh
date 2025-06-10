#!/bin/bash

# Script to ignore Netlify build when there are no frontend changes

# Get previous commit
PREVIOUS_COMMIT=$(git rev-parse HEAD^)
CURRENT_COMMIT=$(git rev-parse HEAD)

# Check if there are changes in frontend or shared
FRONTEND_CHANGES=$(git diff --name-only $PREVIOUS_COMMIT $CURRENT_COMMIT | grep -E '^(apps/frontend|packages/shared|netlify\.toml)')
BACKEND_ONLY_CHANGES=$(git diff --name-only $PREVIOUS_COMMIT $CURRENT_COMMIT | grep -E '^apps/backend')

# If there are only backend changes, skip the build
if [ -z "$FRONTEND_CHANGES" ] && [ -n "$BACKEND_ONLY_CHANGES" ]; then
  echo "🚫 Only backend changes detected. Skipping frontend build."
  exit 1
fi

# If there are frontend or shared changes, continue with the build
echo "✅ Frontend or shared changes detected. Proceeding with build."
exit 0
