#!/bin/bash
if [[ $(pwd) =~ .+simorgh ]]; then
	# cd to application route directory this allows the commiting/pushing from any part of the application
	cd ${BASH_REMATCH}

	# if the wordcount of the package-lock file diff is not zero
	amount_of_additions=$(git diff origin/latest -- package-lock.json | grep "+  " | wc -l)

	# assume a single addition is a version bump
	if [ $amount_of_additions \> 1 ]; then
		echo "Your package-lock.json differs to origin/latest with" \
			$(git diff origin/latest -- package-lock.json | grep "+  " | wc -l) \
			"additions"
		echo "Unless you have made dependency changes on your feature branch it is likely your branch is out of date with origin/latest"
		echo "We suggest you 'git pull origin latest' and run 'npm install' to update your package-lock.json"
		echo "This ensures you are running the most recent version of the application and it's dependecies"
		echo "This also that the husky precommit and prepush hooks are valid on you local setup"
		echo ""
	fi
fi
