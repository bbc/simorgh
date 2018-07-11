#!/bin/bash
if [[ $(pwd) =~ .+simorgh ]]; then
  # cd to application route directory this allows the commiting/pushing from any part of the application
  cd ${BASH_REMATCH}

  # can the amount of lines changed
  amount_of_additions=$(git diff origin/latest -- package-lock.json | grep "+  " | wc -l)

  # assume a single addition is a version bump
  if [ $amount_of_additions \> 1 ]; then
    echo "Your package-lock.json differs to origin/latest with" \
      $(git diff origin/latest -- package-lock.json | grep "+  " | wc -l) \
      "additions"
    npm install
  fi
fi
