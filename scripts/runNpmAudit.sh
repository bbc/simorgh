#!/bin/bash

for i in {1..5}
do
    npm audit
    EXIT_CODE=$?

    if [ $EXIT_CODE -eq 0 ]
    then
        # npm audit returned succesfully, exiting
        exit 0
    else
        echo 'NPM audit failed, retrying...'
    fi
done

exit 0