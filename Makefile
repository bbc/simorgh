none:
	@ echo Please specify a target

install:
	npm --version; node --version;
	rm -rf node_modules
	npm ci;

developmentTests:
	npx apache2-license-checker;
	npm run test;

productionTests:
	npm run build && npm run test:ci;

testChromatic:
	npx chromatic test run  --build-script-name build:storybook --exit-once-uploaded --no-interactive || true

testE2Es:
	CYPRESS_SMOKE=false CYPRESS_APP_ENV=test npm run cypress

test3rdPartyE2Es:
	npm run cypress:3rdParty

liveE2Es:
	CYPRESS_SMOKE=false CYPRESS_APP_ENV=live npm run cypress

buildStorybook:
	npm run build:storybook;

buildCi:
	export NODE_ENV=production && rm -rf build && npm run build:test && npm run build:live;
