none:
	@ echo Please specify a target

install:
	npm --version; node --version;
	rm -rf node_modules
	npm ci;

developmentTests:
	npx apache2-license-checker;
	npm run test;

testChromatic:
	npm run test:chromatic

productionTests:
	npm run build && xvfb-run npm run test:prod:ci;

testE2Es:
	CYPRESS_SMOKE=false CYPRESS_APP_ENV=test npm run cypress

liveE2Es:
	CYPRESS_SMOKE=false CYPRESS_APP_ENV=live npm run cypress

buildStorybook:
	npm run build:storybook;