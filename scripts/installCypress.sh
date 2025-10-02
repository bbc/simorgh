#!/bin/bash

set -e

# Get working directory from first argument, default to current directory
WORKDIR="${1:-.}"

# Check if package.json exists in the working directory
if [ ! -f "$WORKDIR/package.json" ]; then
  echo "Error: package.json not found in $WORKDIR."
  exit 1
fi

# Extract Cypress version from devDependencies using jq
CYPRESS_VERSION=$(jq -r '.devDependencies.cypress // empty' "$WORKDIR/package.json")

if [ -z "$CYPRESS_VERSION" ]; then
  echo "Error: Cypress version not found in devDependencies of $WORKDIR/package.json."
  exit 1
fi

echo "Installing Cypress version $CYPRESS_VERSION in $WORKDIR"
yarn --cwd "$WORKDIR" add "cypress@$CYPRESS_VERSION" --dev

echo "Cypress $CYPRESS_VERSION installed successfully in $WORKDIR."
