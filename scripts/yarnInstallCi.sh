#!/bin/bash
if [ $1 = "--production"]; then
  rm -rf node_modules | yarn workspaces focus --all --immutable --production
else
  rm -rf node_modules | yarn install --immutable --check-cache
fi
