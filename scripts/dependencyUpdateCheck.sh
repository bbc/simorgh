#!/bin/bash
if [[ $(pwd) =~ .+simorgh ]]; then
  # cd to application route directory this allows the commiting/pushing from any part of the application
  cd ${BASH_REMATCH}

  # can the amount of lines changed
  amount_of_additions=$(git diff origin/latest -- package-lock.json | grep "+  " | wc -l)

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

  # assume a single addition is a version bump
  if [ $amount_of_additions \> 1 ]; then
    echo "Your package-lock.json differs to origin/latest with" \
      $amount_of_additions \
      "additions"
    echo "Now running an 'npm install'"
    npm install
  fi
fi
