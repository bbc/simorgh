#!/bin/bash

# Size limit for all bundles used by each service (K)
# Keep these +/- 10K
min=662
max=686

services=( "news" "persian" "igbo" "yoruba" "pidgin" )
failure=false

for service in "${services[@]}"
do
   size=$(du -chsk build/public/static/js/{main,vendor,$service}-*.js | grep total | grep -Eo '[0-9]{1,4}')

   if [[ $size -lt $min ]]; then
     tput setaf 1
     echo "Bundle size for $service is too small at ${size}K, please update thresholds"
     failure=true
   elif [[ $size -gt $max ]]; then
     tput setaf 1
     echo "Bundle size for $service is too great at ${size}K, please update thresholds"
     failure=true
   else 
    tput setaf 2
    echo "${service} JS = ${size}K"
   fi
done

tput sgr0

if [ "$failure" = true ] ; then
    exit 1;
else
    echo 'All bundle sizes are good!'
fi
