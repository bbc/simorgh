#!/bin/bash
# jenkinsProductionFiles.sh by Andrzej Pogonowski

# Steps
# 1. Removes all of the build and dependency directories (build, pack, node_modules)
# 2. Copies all of the source files
# 3. Copes configuration files and other necessary files

# Cleanup
rm -r pack
rm -r build
rm -r node_modules
mkdir pack
chmod -R 755 pack

# Copy needed directories
cp -rf ./src ./pack/src
cp -rf ./cypress ./pack/cypress
cp -rf ./.storybook ./pack/.storybook
cp -rf ./envConfig ./pack/envConfig
cp -rf ./public ./pack/public

# Copy the needed files in the root directory
cp package.json ./pack
cp package-lock.json ./pack
cp .babelrc ./pack
cp .eslintrc.js ./pack
cp .npmrc ./pack
cp .nvmrc ./pack
cp cypress.json ./pack
cp Jenkinsfile ./pack
cp Makefile ./pack
cp a11y.js ./pack
cp excludeFromPublicBuild.txt ./pack

# Copy the webpack configs
cp webpack.config.js ./pack
cp webpack.config.client.js ./pack
cp webpack.config.server.js ./pack


