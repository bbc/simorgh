#!/bin/bash

touch ./pack/build_tag.txt
printf "%b\n" $1 >> ./pack/build_tag.txt