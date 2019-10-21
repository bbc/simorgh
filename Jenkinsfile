#!/usr/bin/env groovy
library 'Simorgh@simorgh-library'

node {
    withEnv([
      'CI=true',
      'APP_DIR=simorgh',
    ]) {
        Simorgh.cleanUp()

        Simorgh.checkoutAndBuild()

        Simorgh.applicationTests()
        
        Simorgh.cleanUp()
    }
}