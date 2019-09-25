#!/bin/bash
CYPRESS_SMOKE=false CYPRESS_APP_ENV=local CYPRESS_BOOM=true npm run cypress

## get status ##
status=$?
## take some decision ## 
[ $status -eq 1 ] && exit 0 || exit 1