VERSION=${versionnumber}

none:
	@ echo Please specify a target

build:
	cd ${APP_DIRECTORY}; npm run build

install:
	npm --version; node --version;
	mkdir -p "${WORKSPACE}/cypress-cache"
	cd ${APP_DIRECTORY}; CYPRESS_CACHE_FOLDER="${WORKSPACE}/cypress-cache" npm ci

install-prod:
	npm --version; node --version;
	cd ${APP_DIRECTORY}; rm -rf node_modules
	cd ${APP_DIRECTORY}; npm install --production

test:
	cd ${APP_DIRECTORY}; npm run test

test-e2e:
	cd ${APP_DIRECTORY}; CYPRESS_CACHE_FOLDER="${WORKSPACE}/cypress-cache" npm install cypress;
	cd ${APP_DIRECTORY}; CYPRESS_CACHE_FOLDER="${WORKSPACE}/cypress-cache" CYPRESS_baseUrl=${baseurl} npm run cypress
