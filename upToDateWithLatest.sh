#!/bin/bash
if [[ $(pwd) =~ .+simorgh ]]; then
	# cd to application route directory this allows the commiting/pushing from any part of the application
	cd ${BASH_REMATCH}

	LATEST_COMMIT=$(git log origin/latest -n 1 --pretty=format:"%H")
	FEATURE_BRANCH_COMMIT_LIST=$(git log --pretty=format:"%H")

	# if the banch git log contains the most recent commit on origin/latest
	if [[ $FEATURE_BRANCH_COMMIT_LIST != *$LATEST_COMMIT* ]]; then
		echo "Your branch is not up-to-date with latest. Push to origin denied."
		echo "Please pull in the most recent version of origin/latest. EG: git pull origin latest"
		exit
	fi

	echo "Up-to-date with latest"
fi
