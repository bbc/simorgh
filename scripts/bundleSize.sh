#!/bin/bash

# Size limit for all bundles used by each service (K) - update frequently!

# If updating:
# - The min value should be 5K less than the smallest service bundle and max should be 5K greater than the largest bundle
# - Bundle sizes can be viewed by running a production build
min=494
max=538


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
