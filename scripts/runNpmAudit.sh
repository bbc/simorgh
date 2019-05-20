#!/bin/bash
echo "Running npm audit"

for i in {1..20}
do
    npm audit
    EXIT_CODE=$?

    if [ $EXIT_CODE -eq 0 ]
    then
        # npm audit returned succesfully, exiting
        exit 0
    else
        echo $EXIT_CODE
        echo 'NPM audit failed, retrying...'
    fi
done

echo "npm audit failed 20 times, this usually highlights a genuine audit failure - please investigate"
exit 1
