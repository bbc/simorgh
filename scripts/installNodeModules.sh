#!/bin/bash
if [ "$1" = "--production" ]; then
  echo "Removing node modules"
  rm -rf node_modules
  echo "Installing 'production' node modules"
  yarn workspaces focus --production
else
  yarn config set supportedArchitectures.os --json '["linux"]'
  yarn config set supportedArchitectures.cpu --json '["arm64"]'
  yarn config set supportedArchitectures.libc --json '[""]'
  echo "Removing node modules"
  rm -rf node_modules
  echo "Installing all node modules"
  yarn install --immutable --check-cache
fi
