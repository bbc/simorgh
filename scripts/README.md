# Scripts

## Instructions for esmDependencyCheck

This script was written with the intent to have a way to quickly check if any of our dependencies are ESM (instead of CommonJS), and with that knowledge make the decision if and when to upgrade or replace them based on the fact that changing to ESM can be difficult. It may become less difficult in the future as the ecosystem matures.

Run the script using the following command: `yarn run esmDependencyCheck`

In order to use this script locally, you need to use a GIT_TOKEN. It is easier to add GIT_TOKEN as an environment variable, because the .env file gets overwritten every time you do a yarn dev. The environment variable GITHUB_TOKEN is available in Github Actions & CodeBuild, which will allow the script to run, and we will call our variable the same name to match.

Add GITHUB_TOKEN to your bash profile (in the same way we do the BFF_PATH), e.g add the line 'export GITHUB_TOKEN="ghp_blablablamadeuptokenblablablablabla"'. For information on how to get your personal access git token to use for this, see 'https://docs.github.com/en/enterprise-server@3.6/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens'

You could also just use GITHUB_TOKEN on the command line when you run the command e.g. GITHUB_TOKEN=XXX yarn run esmDependencyCheck.



Other script instructions can be added above or below