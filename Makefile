none:
	@ echo Please specify a target

install:
	npm --version; node --version;
	rm -rf node_modules
	npm ci;

developmentTests:
	npx apache2-license-checker;
	npm run test;
	npx chromatic test run  --build-script-name build:storybook || true

productionTests:
	npm run build && npm run test:ci;

smokeE2Es:
	npm run build && npm run start & CYPRESS_SMOKE=true npm run cypress:ci

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
