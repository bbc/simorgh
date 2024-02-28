#!/bin/bash
if [ "$1" = "--production" ]; then
  echo "Installing all node modules"
  rm -rf node_modules | yarn workspaces focus --all --production
else
  echo "Installing all node modules from cache"
  rm -rf node_modules | yarn install --immutable --check-cache
fi
