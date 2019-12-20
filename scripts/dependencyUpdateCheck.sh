#!/bin/bash
if [[ $(pwd) =~ .+simorgh ]]; then
  # cd to application route directory this allows the commiting/pushing from any part of the application
  cd ${BASH_REMATCH}

  current_branch=$(git rev-parse --abbrev-ref HEAD)

  # count the amount of lines changed in package-lock.json
  if [ $current_branch == "latest" ]
  then
    amount_of_additions=$(git diff HEAD@{1} -- package-lock.json | grep "+  " | wc -l)
  else
    amount_of_additions=$(git diff origin/latest -- package-lock.json | grep "+  " | wc -l)
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
