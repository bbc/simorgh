#!/bin/bash
if [[ $(pwd) =~ .+simorgh ]]; then
  desired_node_version=$(cat .nvmrc)

  if [[ $(node -v) != "$desired_node_version"* ]]; then
    tput setaf 1
    echo "You're not using our version of node, please move to $desired_node_version"
    tput sgr0
    exit 1
  fi

  desired_npm_version=$(cat .npmrc | cut -d "=" -f2)

  if [[ $(npm -v) != $desired_npm_version ]]; then
    tput setaf 1
    echo "You're not using our version of npm, please move to $desired_npm_version"
    tput sgr0
    exit 1
  fi
fi
