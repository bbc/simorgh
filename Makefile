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
	# sh -e ./scripts/xvfb start;
	# sleep 3;
	# npm run test:e2e:storybook:ci;
	# sh -e ./scripts/xvfb stop;

productionTests:
	npm run build && xvfb-run npm run test:prod:ci;
	# sh -e ./scripts/xvfb start;
	# sleep 3;
	# npm run test:prod:ci;
	# sh -e ./scripts/xvfb stop;

buildStorybook:
	npm run build:storybook;
