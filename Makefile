none:
	@ echo Please specify a target

install:
	npm --version; node --version;
	cd ${APP_DIRECTORY}; npm ci;

installProd:
	cd ${APP_DIRECTORY}; rm -rf node_modules
	cd ${APP_DIRECTORY}; npm ci --only=production

developmentTests:
	cd ${APP_DIRECTORY}; npm run audit:ci;
	cd ${APP_DIRECTORY}; npm run test;
	cd ${APP_DIRECTORY}; xvfb-run npm run test:e2e:storybook:ci

productionTests:
	cd ${APP_DIRECTORY}; npm run build; xvfb-run npm run test:prod:ci;

canIntegrate:
	npm run build; npm run test; xvfb-run npm run test:e2e:storybook:ci; xvfb-run npm run test:prod:ci; xvfb-run npm run test:lighthouse:ci
	