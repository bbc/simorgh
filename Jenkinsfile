#!/usr/bin/env groovy
library 'Simorgh@simorgh-library'

node {
    withEnv([
      'CI=true',
      'APP_DIR=simorgh',
    ]) {
        Simorgh.cleanUp()

        if (env.BRANCH_NAME == 'latest') {
            Simorgh.checkoutAndBuild()
            Simorgh.applicationTests()
        } else {
            // Trigger CI/CD Deployment
            build(
                job: 'simorgh-blue-green/add-alb-updater-lambda',
                propagate: false,
                wait: false
            )
        }
        
        Simorgh.cleanUp()
    }
}