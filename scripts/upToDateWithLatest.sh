#!/bin/bash
if [[ $(pwd) =~ .+simorgh ]]; then
	# cd to application route directory this allows the commiting/pushing from any part of the application
	cd ${BASH_REMATCH}

	LATEST_COMMIT=$(git log origin/latest -n 1 --pretty=format:"%H")
	FEATURE_BRANCH_COMMIT_LIST=$(git log --pretty=format:"%H")

	# if the banch git log contains the most recent commit on origin/latest
	if [[ $FEATURE_BRANCH_COMMIT_LIST != *$LATEST_COMMIT* ]]; then
		# set the console output to red
		tput setaf 1
		echo "Your branch is not up-to-date with latest - push to origin denied."
		echo "Please pull in the most recent version of origin/latest. EG: 'git pull origin latest'"
		# reset the console output colour
		tput sgr0
		exit 1
	fi

	echo "Up-to-date with latest"
fi
