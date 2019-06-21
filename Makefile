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
	Xvfb :99 &
	export PIDFILE=$!;
	npm run test:e2e:storybook:ci;
	killproc -p $PIDFILE Xvfb

productionTests:
	npm run build;
	Xvfb :99 &
	export PIDFILE=$!;
	npm run test:prod:ci;
	killproc -p $PIDFILE Xvfb

buildStorybook:
	npm run build:storybook;
