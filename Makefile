none:
	@ echo Please specify a target

install:
	npm --version; node --version;
	rm -rf node_modules
	npm ci;

developmentTests:
	npx apache2-license-checker;
	npm run test;
	npm run test:chromatic

productionTests:
	npm run build && xvfb-run npm run test:ci;

buildStorybook:
	npm run build:storybook;

buildCi:
	export NODE_ENV=production && rm -rf build && npm run build:test && npm run build:live;
