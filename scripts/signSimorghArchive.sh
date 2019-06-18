#!/bin/bash

# Steps
# 1. Remove the artifact signature file
# 2. Create the artifact signature file
# 3. Store the build information in the artifact signature file

rm -f ./pack/build_tag.txt

touch ./pack/build_tag.txt

printf "%s\n" "$1" >> ./pack/build_tag.txt