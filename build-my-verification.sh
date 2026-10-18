#!/bin/bash
set -e
npx esbuild reference-app-web/src/my-verification/my-verification-script.js \
  --bundle \
  --outfile=reference-app-web/static/omid-my-verification-script-v1.js \
  --format=iife \
  --global-name=CustomVerifier \
  --platform=browser
