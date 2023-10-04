# Scripts

## Instructions for esmDependencyCheck

This script was written with the intent to have a way to quickly check if any of our dependencies are ESM (instead of CommonJS), and with that knowledge make the decision if and when to upgrade or replace them based on the fact that changing to ESM can be difficult. It may become less difficult in the future as the ecosystem matures.

To run it use 'yarn run esmDependencyCheck'.

In order to use this script, you need to put your GIT_TOKEN in your .env file. 

This code 'const dotenv = require('dotenv').config();' brings that config into the script file so it can then extract the token with the lines 'const gitToken = dotenv.parsed.GIT_TOKEN || false;' and then use it to access information on github repositories. Without this included in your .env, the gitToken will be false and the script will not run. This is because without it the data will all come back undefined, and the script is useless. For this to work in an automated way in the pipeline, we will need to add environment variables with cosmos.

For information on how to get your personal access git token to use for this, see 'https://docs.github.com/en/enterprise-server@3.6/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens'


Other script instructions can be added above or below