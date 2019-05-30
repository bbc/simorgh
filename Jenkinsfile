#!/usr/bin/env groovy

def dockerRegistry = "329802642264.dkr.ecr.eu-west-1.amazonaws.com"
def nodeImageVersion = "0.0.2"
def nodeImage = "${dockerRegistry}/bbc-news/node-10-lts:${nodeImageVersion}"

def stageName = ""
def packageName = 'simorgh.zip'
def storybookDist = 'storybook.zip'

def runDevelopmentTests(){
  sh 'make install'
  sh 'make developmentTests'
}

def runProductionTests(){
  sh 'make installProd'
  sh 'make productionTests'
}

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
    stage ('Build and Test') {
      when {
        expression { env.BRANCH_NAME != 'latest' }
      }
      parallel {
        stage('Test Development') {
          agent {
            docker {
              image "${nodeImage}"
              args '-u root -v /etc/pki:/certs'
            }
          }
          steps {
            runDevelopmentTests()
          }
        }

        stage('Test Production') {
          agent {
            docker {
              image "${nodeImage}"
              args '-u root -v /etc/pki:/certs'
            }
          }
          steps {
            runProductionTests()
          }
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
    stage ('Build, Test & Package') {
      when {
        expression { env.BRANCH_NAME == 'latest' }
      }
      parallel {
        stage('Test Development') {
          agent {
            docker {
              image "${nodeImage}"
              args '-u root -v /etc/pki:/certs'
            }
          }
          steps {
            runDevelopmentTests()
          }
        }
        stage('Test Production and Zip Production') {
          agent {
            docker {
              image "${nodeImage}"
              args '-u root -v /etc/pki:/certs'
            }
          }
          steps {
            // Testing
            runProductionTests()
            // Moving files necessary for production to `pack` directory.
            sh "./scripts/jenkinsProductionFiles.sh"
            sh "rm -f ${packageName}"
            zip archive: true, dir: 'pack/', glob: '', zipFile: packageName
            stash name: 'simorgh', includes: packageName
          }
        }
        stage('Build storybook dist') {
          agent {
            docker {
              image "${nodeImage}"
              args '-u root -v /etc/pki:/certs'
            }
          }
          steps {
            sh "rm -f storybook.zip"
            sh 'make install'
            sh 'make buildStorybook'
            zip archive: true, dir: 'storybook_dist', glob: '', zipFile: storybookDist
            stash name: 'simorgh_storybook', includes: storybookDist
          }
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
    stage ('Run Pipeline') {
      when {
        expression { env.BRANCH_NAME == 'latest' }
      }
      options {
        // Do not perform the SCM step
        skipDefaultCheckout true
      }
      agent any
      steps {
        unstash 'simorgh'
        build(
          job: 'simorgh-infrastructure/latest',
          parameters: [
            [$class: 'StringParameterValue', name: 'BRANCH', value: env.BRANCH_NAME],
            [$class: 'StringParameterValue', name: 'APPLICATION_BRANCH', value: env.BRANCH_NAME],
            [$class: 'StringParameterValue', name: 'ENVIRONMENT', value: 'live'],
          ],
          propagate: true,
          wait: true
        )
      }
    }
  }
  post {
    always {
      cleanWs()
    }
  }
}
