#!/usr/bin/env groovy

pipeline {
  agent any
  options {
    timeout(time: 10, unit: 'MINUTES')
    timestamps ()
  }
  stages {
    stage ('Run Pipeline') {
      agent any
      steps {
        build(
          job: 'articles-renderer-infrastructure/latest',
          parameters: [[$class: 'StringParameterValue', name: 'BRANCH', value: env.BRANCH_NAME]],
          propagate: true,
          wait: true
        )
      }
    }
  }
}