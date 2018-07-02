#!/usr/bin/env groovy

pipeline {
  agent any
  options {
    timeout(time: 60, unit: 'MINUTES')
    timestamps ()
  }
  stages {
    stage ('Run Pipeline') {
      when {
        expression { env.BRANCH_NAME == 'latest' }
      }
      agent any
      steps {
        build(
          job: 'simorgh-infrastructure/latest',
          parameters: [[$class: 'StringParameterValue', name: 'BRANCH', value: env.BRANCH_NAME]],
          propagate: true,
          wait: true
        )
      }
    }
  }
}
