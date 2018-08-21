none:
	@ echo Please specify a target

developmentTests:
	npm --version; node --version;
	cd ${APP_DIRECTORY}; npm ci; npm run test; xvfb-run npm run test:e2e:storybook:ci

productionTests:
	cd ${APP_DIRECTORY}; npm ci --only=production; npm run build; xvfb-run npm run test:e2e:ci; xvfb-run npm run test:accessibility:ci


