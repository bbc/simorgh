#!/bin/bash
if [ "$1" = "--production" ]; then
  rm -rf node_modules | yarn workspaces focus --all --production
else
  rm -rf node_modules | yarn install --immutable
fi
