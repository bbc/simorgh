#!/bin/bash
if [ "$1" = "--production" ]; then
  echo "Installing all node modules"
  rm -rf node_modules | yarn add "@bbc/reverb@git+ssh://git@github.com:bbc/reverb.git#semver:^3.9.0" | yarn workspaces focus --all --production
else
  echo "Installing all node modules"
  rm -rf node_modules | yarn add "@bbc/reverb@git+ssh://git@github.com:bbc/reverb.git#semver:^3.9.0" | yarn install --immutable --check-cache
fi
