#!/bin/bash

LAST_BUILD_JOB_URL=$JENKINS_URL'job/simorgh-infrastructure/job/latest/lastBuild/api/json'

lastBuildOutput1=$(curl $LAST_BUILD_JOB_URL --cert $COSMOS_CERT --key $COSMOS_KEY)

if [[ $lastBuildOutput1 =~ "nextBuild\":null" ]]; then
  if [[ $lastBuildOutput1 =~ "result\":\"SUCCESS" ]]; then
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

sleep 5 

lastBuildOutput2=$(curl $LAST_BUILD_JOB_URL --cert $COSMOS_CERT --key $COSMOS_KEY)

if [[ $lastBuildOutput2 =~ "nextBuild\":null" ]]; then
  if [[ $lastBuildOutput1 =~ "result\":\"SUCCESS" ]]; then
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
