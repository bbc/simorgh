#!/bin/bash

# Size limit for all bundles used by each service (K)
# Keep these +/- 5K and update frequently!
min=497
max=517

services=( "afaanoromoo" "afrique" "amharic" "arabic" "azeri" "bengali" "burmese" "cymrufyw" "gahuza" "gujarati" "hausa" "hindi" "igbo" "indonesia" "japanese" "korean" "kyrgyz" "marathi" "mundo" "naidheachdan" "nepali" "news" "pashto" "persian" "pidgin" "portuguese" "punjabi" "russian" "serbian" "sinhala" "somali" "swahili" "tamil" "telugu" "thai" "tigrinya" "turkce" "ukchina" "ukrainian" "urdu" "uzbek" "vietnamese" "yoruba" "zhongwen" )
failure=false

for service in ${services[@]}
do
   size=$(($(cat build/public/static/js/{main,vendor,$service}-*.js | wc -c | tr -d ' ') / 1000 ))

   if [[ $size -lt $min ]]; then
     tput setaf 1
     echo "Bundle size for $service is too small at ${size}K, please update thresholds in './scripts/bundleSize.sh'"
     failure=true
   elif [[ $size -gt $max ]]; then
     tput setaf 1
     echo "Bundle size for $service is too great at ${size}K, please update thresholds in './scripts/bundleSize.sh'"
     failure=true
   else
    tput setaf 2
    echo "${service} JS = ${size}K"
   fi
done

tput sgr0

if [ $failure = true ] ; then
    exit 1;
else
    echo 'All bundle sizes are good!'
fi
