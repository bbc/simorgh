#!/bin/bash

# Size limit for all bundles used by each service (K)
limit=730

services=( "news" "persian" "igbo" "yoruba" "pidgin" )
failure=false

tput setaf 1

for i in "${services[@]}"
do
   size=$(du -chsk build/public/static/js/{main,vendor,$i}-*.js | grep total | grep -Eo '[0-9]{1,4}')

   if [[ $size -gt $limit ]]; then
     echo "Bundle size for $i is too great at ${size}K"
     failure=true
   fi
done

tput sgr0

if [ "$failure" = true ] ; then
    exit 1;
else
    echo 'All bundle sizes are good!'
fi
