#!/bin/bash
if [[ $(pwd) =~ .+simorgh ]]; then
  desired_node_version=$(cat .nvmrc)

  if [[ $(node -v) != "$desired_node_version"* ]]; then
    tput setaf 1
    echo "\nOh no! You're not using our version of node, please move to $desired_node_version in order to reduce bundling inconsistency"
    tput setaf 3
    echo "This can be done by running 'nvm install $desired_node_version && nvm use $desired_node_version'\n "
    tput sgr0
    exit 1
  fi

  # cut is used to transform 'version=6.4.1' into '6.4.1' for easy comparison
  desired_yarn_version=$(cat .yarnrc | cut -d "=" -f2)

  if [[ $(yarn -v) != $desired_yarn_version ]]; then
    tput setaf 1
    echo "\nOh no! You're not using our version of yarn, please move to version $desired_yarn_version in order to reduce bundling inconsistency"
    tput setaf 3
    echo "This can be done by running 'npm i -g yarn@$desired_yarn_version'"
    echo "Once you have done this please run 'yarn install' again and commit any changes to your package-lock.json\n"
    tput sgr0
    exit 1
  fi
fi
