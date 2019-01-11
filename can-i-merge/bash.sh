#!/bin/bash

canIMerge() {
  # '$*' means all parameters passed to function https://www.cyberciti.biz/faq/unix-linux-bash-function-number-of-arguments-passed/
  # this is needed because of the way the JSON is set to a variable
  if [[ $* =~ "nextBuild\":null" ]]; then
  if [[ $* =~ "result\":\"SUCCESS" ]]; then
    echo "🎉 The latest build was successful 🎉"
  else 
    echo "Error: The latest build is not marked as 'SUCCESS'"
    echo "Failed!"
    exit 1
  fi
else
  echo "Error: This is not the latest build"
  echo "Failed!"
  exit 1
fi
}

LAST_BUILD_JOB_URL=$JENKINS_URL'job/simorgh-infrastructure/job/latest/lastBuild/api/json'

lastBuildOutput1=$(curl $LAST_BUILD_JOB_URL --cert $COSMOS_CERT --key $COSMOS_KEY)

canIMerge lastBuildOutput1

sleep 5 

lastBuildOutput2=$(curl $LAST_BUILD_JOB_URL --cert $COSMOS_CERT --key $COSMOS_KEY)

canIMerge lastBuildOutput2

echo "\\0/ you can merge! Try not to break live 🙃"

# Why does this work?
#
# - We curl the simorgh-infrastructure Jenkins job and look explicitly for the `result` to equal `SUCCESS` with some super dumb regex
# - The `result` of a currently building job is set to `null`, which will also equal a failure
# - We run the job twice to mitigate the tiny chance of a race condition between the simorgh-infrastructure job being triggered
#   and the /lastBuild/api/json being updated (3 seconds at worst)