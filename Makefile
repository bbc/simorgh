none:
	@ echo Please specify a target

install:
	npm --version; node --version;
	npm ci;

installProd:
	rm -rf node_modules
	npm ci --only=production

developmentTests:
	npx apache2-license-checker;
	npm run test;
	xvfb-run npm run test:e2e:storybook:ci;
	npm run test:chromatic

productionTests:
	npm run build && xvfb-run npm run test:prod:ci;

buildStorybook:
	npm run build:storybook;
