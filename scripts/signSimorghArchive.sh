#!/bin/bash

touch ./pack/build_tag.txt
printf "%s\n" $1 >> ./pack/build_tag.txt