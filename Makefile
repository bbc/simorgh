none:
	@ echo Please specify a target

install:
	npm --version; node --version;
	cd ${APP_DIRECTORY}; npm ci;

developmentTests:
	cd ${APP_DIRECTORY}; npm run test; xvfb-run npm run test:e2e:storybook:ci

productionTests:
	cd ${APP_DIRECTORY}; npm run build; xvfb-run npm run test:e2e:ci; xvfb-run npm run test:accessibility:ci
