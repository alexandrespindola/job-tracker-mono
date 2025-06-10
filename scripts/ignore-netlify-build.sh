#!/bin/bash

# Script para ignorar build do Netlify quando não há mudanças no frontend

# Obter o commit anterior
PREVIOUS_COMMIT=$(git rev-parse HEAD^)
CURRENT_COMMIT=$(git rev-parse HEAD)

# Verificar se há mudanças no frontend ou shared
FRONTEND_CHANGES=$(git diff --name-only $PREVIOUS_COMMIT $CURRENT_COMMIT | grep -E '^(apps/frontend|packages/shared|netlify\.toml)')
BACKEND_ONLY_CHANGES=$(git diff --name-only $PREVIOUS_COMMIT $CURRENT_COMMIT | grep -E '^apps/backend')

# Se só há mudanças no backend, pular o build
if [ -z "$FRONTEND_CHANGES" ] && [ -n "$BACKEND_ONLY_CHANGES" ]; then
  echo "🚫 Only backend changes detected. Skipping frontend build."
  exit 1
fi

# Se há mudanças no frontend ou shared, continuar com o build
echo "✅ Frontend or shared changes detected. Proceeding with build."
exit 0
