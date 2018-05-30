#!/usr/bin/env groovy

pipeline {
  agent any
  options {
    timeout(time: 30, unit: 'MINUTES')
    timestamps ()
  }
  stages {
    stage ('Run Pipeline') {
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