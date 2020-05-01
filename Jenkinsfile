#!/usr/bin/env groovy
library 'Simorgh'

def dockerRegistry = "329802642264.dkr.ecr.eu-west-1.amazonaws.com"
def nodeImageVersion = "12.16.2"
def nodeImage = "${dockerRegistry}/bbc-news/node-12-lts:${nodeImageVersion}"

def appGitCommit = ""
def appGitCommitAuthor = ""
def messageColor = 'danger'

def stageName = ""
def packageName = 'simorgh.zip'
def storybookDist = 'storybook.zip'
def staticAssetsDist = 'static.zip'

def setupCodeCoverage() {
  sh 'curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > ./cc-test-reporter'
  sh 'chmod +x ./cc-test-reporter'
  sh './cc-test-reporter before-build'
}

def runDevelopmentTests(){
  sh 'make install'
  sh 'make developmentTests'
}

def runProductionTests(){
  sh 'make install'
  sh 'make productionTests'
  sh 'npm prune --production'
}

def getCommitInfo = {
  appGitCommit = sh(returnStdout: true, script: "git rev-parse HEAD")
  appGitCommitAuthor = sh(returnStdout: true, script: "git --no-pager show -s --format='%an' ${appGitCommit}").trim()
}

def setBuildTagInfo(gitCommit, gitCommitAuthor) {
  """
  *${env.JOB_NAME} [build #${env.BUILD_NUMBER}]*
  ${env.BUILD_URL}
  *Author*: ${gitCommitAuthor}
  *Commit Hash*
  ${gitCommit}
  """
}

def messageContent(title, text, stageName, gitCommit) {
  "${env.JOB_NAME}\n ${title}\n ${env.BUILD_URL}\n ${text}\n\
    *Stage*: ${stageName}\n\
    *Commit Hash*\n ${gitCommit}\n\
    "
}

def notifySlack(messageParameters) {
  def title = "*${messageParameters.buildStatus} on \"${messageParameters.branchName}\" [build #${env.BUILD_NUMBER}]*"

  def text = "*Author*: ${messageParameters.gitCommitAuthor}"

  def message = messageContent(title, text,
    messageParameters.stageName, messageParameters.gitCommit
  )

  slackSend(
    channel: messageParameters.slackChannel,
    color: messageParameters.colour,
    message: message
  )
}

def buildStaticAssets(env, tag) {
  sh 'rm -rf build && rm -rf staticAssets && mkdir staticAssets'
  sh "rm -f static${tag}.zip"

  sh "npm run build:$env"
  sh 'rm -rf staticAssets && mkdir staticAssets'
  sh "cp -R build/. staticAssets"
  sh "cd staticAssets && xargs -a ../excludeFromPublicBuild.txt rm -f {}"
  zip archive: true, dir: 'staticAssets', glob: '', zipFile: "static${tag}.zip"
  stash name: "staticAssets${tag}", includes: "static${tag}.zip"
}

def cancelPreviousBuilds() {
  def jobName = env.JOB_NAME
  def buildNumber = env.BUILD_NUMBER.toInteger()
  def currentJob = Jenkins.instance.getItemByFullName(jobName)

// Iterating over the builds for specific job
  for (def build : currentJob.builds) {
    // If there is a build that is currently running and it's not current build
    if (build.isBuilding() && build.number.toInteger() != buildNumber) {
        // Stop the previous build
        build.doStop()
    }
  }
}

pipeline {
  agent any
  options {
    buildDiscarder(logRotator(daysToKeepStr: '3', artifactDaysToKeepStr: '3'))
    timeout(time: 90, unit: 'MINUTES')
    timestamps ()
  }
  environment {
    APP_DIRECTORY = "app"
    CI = true
  }
  parameters {
    string(name: 'SLACK_CHANNEL', defaultValue: '#si_repo-simorgh', description: 'The Slack channel where the build status is posted.')
    booleanParam(name: 'SKIP_OOH_CHECK', defaultValue: false, description: 'Allow Simorgh deployment to LIVE outside the set Out of Hours (O.O.H) time span.')
  }
  stages {
    stage ('Check and stop previous running builds') {
      when {
        expression { env.BRANCH_NAME != 'latest' }
      }
      steps {
        cancelPreviousBuilds()
      }
    }
    stage ('Build and Test') {
      when {
        expression { env.BRANCH_NAME != 'latest' }
      }
      failFast true
      parallel {
        stage ('Test Development') {
          agent {
            docker {
              image "${nodeImage}"
              args '-u root -v /etc/pki:/certs'
            }
          }
          steps {
            setupCodeCoverage()
            withCredentials([string(credentialsId: 'simorgh-cc-test-reporter-id', variable: 'CC_TEST_REPORTER_ID'), string(credentialsId: 'simorgh-chromatic-app-code', variable: 'CHROMATIC_APP_CODE')]) {
              runDevelopmentTests()
              sh './cc-test-reporter after-build -t lcov --debug --exit-code 0'

            }
          }
        }
        stage ('Test Production') {
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
        stage ('Test Development') {
          agent {
            docker {
              image "${nodeImage}"
              args '-u root -v /etc/pki:/certs'
            }
          }
          steps {
            setupCodeCoverage()
            withCredentials([string(credentialsId: 'simorgh-cc-test-reporter-id', variable: 'CC_TEST_REPORTER_ID'), string(credentialsId: 'simorgh-chromatic-app-code', variable: 'CHROMATIC_APP_CODE')]) {
              runDevelopmentTests()
              sh './cc-test-reporter after-build -t lcov --debug --exit-code 0'
            }
          }
        }
        stage ('Test Production and Zip Production') {
          agent {
            docker {
              image "${nodeImage}"
              args '-u root -v /etc/pki:/certs'
            }
          }
          steps {
            // Testing
            runProductionTests()

            script {
              getCommitInfo()
              Simorgh.setBuildMetadataLegacy('simorgh', env.BUILD_NUMBER, appGitCommit) // Set Simorgh build metadata
            }

            // Moving files necessary for production to `pack` directory.
            sh "./scripts/jenkinsProductionFiles.sh"

            script {
              sh "node ./scripts/signBuild.js ${env.JOB_NAME} ${env.BUILD_NUMBER} ${env.BUILD_URL} ${appGitCommit}"
            }

            sh "rm -f ${packageName}"
            zip archive: true, dir: 'pack/', glob: '', zipFile: packageName
            stash name: 'simorgh', includes: packageName
            sh "rm -rf pack"
          }
        }
        stage ('Build storybook dist') {
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
        stage ('Build Static Assets') {
          agent {
            docker {
              image "${nodeImage}"
              args '-u root -v /etc/pki:/certs'
            }
          }
          steps {
            sh 'make install'

            buildStaticAssets("test", "TEST")
            buildStaticAssets("live", "LIVE")
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
        // This stage triggers the B/G deployment when merging Simorgh
        // build(
        //   job: 'simorgh-blue-green/add-alb-updater-lambda',
        //   propagate: false,
        //   wait: false
        // )
        unstash 'simorgh'
        script {
          def run = build(
            job: 'simorgh-infrastructure-test/latest',
            parameters: [
              [$class: 'StringParameterValue', name: 'APPLICATION_BRANCH', value: env.BRANCH_NAME],
              booleanParam(name: 'SKIP_OOH_CHECK', value: params.SKIP_OOH_CHECK)
            ],
            propagate: true,
            wait: true
          )
          echo "Child variables: ${run.buildVariables}"
          currentBuild.description = "Cosmos release ${run.buildVariables.COSMOS_VERSION}"
        }
      }
    }
  }
  post {
    always {
      script {
        getCommitInfo()
      }
      // Clean the workspace
      cleanWs()
    }
    aborted {
      script {
        if(env.BRANCH_NAME == 'latest') {
          def messageParameters = [
            buildStatus: 'Aborted',
            branchName: env.BRANCH_NAME,
            colour: messageColor,
            gitCommit: appGitCommit,
            gitCommitAuthor: appGitCommitAuthor,
            stageName: stageName,
            slackChannel: params.SLACK_CHANNEL
          ]
          notifySlack(messageParameters)
        }
      }
    }
    failure {
      script {
        if(env.BRANCH_NAME == 'latest') {
          def messageParameters = [
            buildStatus: 'Failed',
            branchName: env.BRANCH_NAME,
            colour: messageColor,
            gitCommit: appGitCommit,
            gitCommitAuthor: appGitCommitAuthor,
            stageName: stageName,
            slackChannel: params.SLACK_CHANNEL
          ]
          notifySlack(messageParameters)
        }
      }
    }
    unstable {
      script {
        if(env.BRANCH_NAME == 'latest') {
          def messageParameters = [
            buildStatus: 'Unstable',
            branchName: env.BRANCH_NAME,
            colour: messageColor,
            gitCommit: appGitCommit,
            gitCommitAuthor: appGitCommitAuthor,
            stageName: stageName,
            slackChannel: params.SLACK_CHANNEL
          ]
          notifySlack(messageParameters)
        }
      }
    }
  }
}
