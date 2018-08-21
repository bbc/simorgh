#!/usr/bin/env groovy

def dockerRegistry = "329802642264.dkr.ecr.eu-west-1.amazonaws.com"
def nodeImageVersion = "0.0.5"
def nodeImage = "${dockerRegistry}/bbc-news/node-8-lts:${nodeImageVersion}"
def nodeName
def stageName = ""

pipeline {
  agent any
  options {
    timeout(time: 60, unit: 'MINUTES')
    timestamps ()
  }
  environment {
    APP_DIRECTORY = "app"
    CI = true
  }
  stages {
    stage('Checkout application repo') {
      when {
        expression { params.BRANCH != 'latest' }
      }
      agent {
        docker {
          image "${nodeImage}"
          args '-u root -v /etc/pki:/certs'
        }
      }
      steps {
        sh "rm -rf ${env.APP_DIRECTORY}"
        checkout([
          $class: 'GitSCM', 
          branches: [[name: "*/${params.BRANCH}"]], 
          doGenerateSubmoduleConfigurations: false, 
          extensions: [[
            $class: 'RelativeTargetDirectory', 
            relativeTargetDir: "${env.APP_DIRECTORY}"
          ]], 
          submoduleCfg: [], 
          userRemoteConfigs: [[
            credentialsId: 'github', url: 'https://github.com/bbc/simorgh.git'
          ]]
        ])
        script {
          getCommitInfo()
          nodeName = "${env.node_name}".toString()
        }
      }
      post {
        always {
          script {
            stageName = env.STAGE_NAME
          }
        }
      }
    }
    stage ('Run application tests') {
      when {
        expression { params.BRANCH != 'latest' }
      }
      agent {
        docker {
          image "${nodeImage}"
          label nodeName
          args '-u root -v /etc/pki:/certs'
        }
      }
      steps {
        sh 'make install'
        sh 'make test'
      }
      post {
        always {
          script {
            stageName = env.STAGE_NAME
          }
        }
      }
    }
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
