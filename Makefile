none:
	@ echo Please specify a target

install:
	npm --version; node --version;
	rm -rf node_modules
	npm ci;

developmentTests:
	npx apache2-license-checker;
	npm run test;

developmentChromaticTests:
	npm run test:chromatic;

productionTests:
	npm run build && xvfb-run npm run test:prod:ci;

buildStorybook:
	npm run build:storybook;
