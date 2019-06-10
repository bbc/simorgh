#!/bin/bash
if [[ $(pwd) =~ .+simorgh ]]; then
  desired_node_version=$(cat .nvmrc)

  if [[ $(node -v) != "$desired_node_version"* ]]; then
    tput setaf 1
    echo "\nOh no! You're not using our version of node, please move to $desired_node_version in order to reduce bundling inconsistency"
    tput setaf 3
    echo "This can be done by running 'nvm install $desired_node_version && nvm use $desired_node_version'\n "
    tput setaf 5
    echo "If you are certain you are using the correct node version, do not use --no-verify. Husky does not reliably source the node version from .nvmrc or your path, try npm rebuild, rm -rf node_modules, npm install. If this still doesn't work dive through your terminal path and remove node_modules from every parent directory then rerun the preceding three commands. NB It's unclear which of these helps, if you find out please open a PR to update this message. \n "
    tput sgr0
    exit 1
  fi

  # cut is used to transform 'version=6.4.1' into '6.4.1' for easy comparison
  desired_npm_version=$(cat .npmrc | cut -d "=" -f2)

  if [[ $(npm -v) != $desired_npm_version ]]; then
    tput setaf 1
    echo "\nOh no! You're not using our version of npm, please move to version $desired_npm_version in order to reduce bundling inconsistency"
    tput setaf 3
    echo "This can be done by running 'npm i -g npm@$desired_npm_version'"
    echo "Once you have done this please run 'npm install' again and commit any changes to your package-lock.json\n"
    tput sgr0
    exit 1
  fi
fi
