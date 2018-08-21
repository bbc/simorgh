#!/bin/bash
if [[ $(pwd) =~ .+simorgh ]]; then
  # cd to application route directory this allows the commiting/pushing from any part of the application
  cd ${BASH_REMATCH}

  CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

  # if the current branch is latest
  if [[ $CURRENT_BRANCH == 'latest' ]]; then
    # set the console output to red
    tput setaf 1
    echo "Stop trying to push to latest"
    echo "If a push to latest is essential add the flag '--no-verify'. EG: 'git push --no-verify'"
    # reset the console output colour
    tput sgr0
    exit 1
  fi
fi
