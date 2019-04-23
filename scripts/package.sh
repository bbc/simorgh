#!/bin/bash
# package.sh by Andrzej Pogonowski
# What is this?: This is the script that packages all the necessary files for deployment
# Why does this exists?: The final deliverable is thicc so we need to limit the amout of files that are passed

# Steps
# 1. Removes all of the build and dependency directories (build, pack, node_modules)
# 2. Copies all of the source files
# 

rm -r pack
rm -r build
rm -r node_modules
mkdir pack
chmod -R 755 pack
pwd

cp -rf ./src ./pack/src
cp -rf ./cypress ./pack/cypress
cp -rf ./.storybook ./pack/.storybook
cp -rf ./envConfig ./pack/envConfig
cp -rf ./public ./pack/public
cp -rf ./data ./pack/data

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

cp webpack.config.js ./pack
cp webpack.config.client.js ./pack
cp webpack.config.server.js ./pack


