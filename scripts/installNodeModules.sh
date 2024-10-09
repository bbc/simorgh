#!/bin/bash
if [ "$1" = "--production" ]; then
  echo "Removing node modules"
  rm -rf node_modules
  echo "Installing 'production' node modules"
  yarn workspaces focus --production
else
  echo "Removing node modules"
  rm -rf node_modules
  echo "Installing all node modules"
  yarn install --immutable --check-cache
fi
