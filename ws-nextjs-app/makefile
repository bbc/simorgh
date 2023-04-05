BUILD_DIR=~/Documents/workspace/simorgh

install:
	cd ${BUILD_DIR}/ws-nextjs-app && yarn install && yarn build:test

artifacts:	
	# Copy artifacts for deployment
	cp -r ${BUILD_DIR}/ws-nextjs-app/build/standalone/. $(ARTIFACTS_DIR)
	cp run.sh $(ARTIFACTS_DIR)

	cd $(ARTIFACTS_DIR) && zip -ry ${BUILD_DIR}/lambdaFunctionSrc.zip .
	rm -rf "$(ARTIFACTS_DIR)"
	mv ${BUILD_DIR}/lambdaFunctionSrc.zip "$(ARTIFACTS_DIR)"

build-NextjsFunction: install artifacts
