#!/bin/bash
if [[ $(pwd) =~ .+simorgh ]]; then
	# cd to application route directory
	cd ${BASH_REMATCH}

	# if the wordcount of the package-lock file diff is not zero
	test=$(git diff origin/latest -- package-lock.json | wc -l)
	if [ $test -ne 0 ]; then
		echo "Your package-lock.json differs to origin/latest, attempting to pull latest into your branch"
		git pull origin latest
		echo "Removing package-lock from local branch"
		rm package-lock.json
		echo "Running 'npm install' to update the package-lock.json"
		npm install
	fi
fi
