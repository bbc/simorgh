#!/bin/bash
#

git pull origin latest

test=$(git diff origin/latest -- package-lock.json | wc -l)

if [ $test -ne 0 ]
	then
	npm install
fi

