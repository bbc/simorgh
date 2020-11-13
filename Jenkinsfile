#!/usr/bin/env groovy
library 'Simorgh'

def dockerRegistry = "329802642264.dkr.ecr.eu-west-1.amazonaws.com"
def nodeImageVersion = "12.18.5"
def nodeImage = "${dockerRegistry}/bbc-news/node-12-lts:${nodeImageVersion}"

def appGitCommit = ""
def appGitCommitAuthor = ""
def messageColor = 'danger'

def stageName = ""
def packageName = 'simorgh.zip'
def staticAssetsDist = 'static.zip'

def installDependencies(){
  sh 'make install'
}

def buildApplication(){
  sh 'npm run build'
}

def pruneDevDependencies(){
  sh 'npm prune --production'
}

def getCommitInfo = {
  appGitCommit = sh(returnStdout: true, script: "git rev-parse HEAD")
  appGitCommitAuthor = sh(returnStdout: true, script: "git --no-pager show -s --format='%an' ${appGitCommit}").trim()
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
  sh "find build -type f -name '*.png' -delete" // Temp remove all .png assets to speed up upload of static assets (These assets are already avaiable on the CDN)
  sh "cp -R build/. staticAssets"
  sh "cd staticAssets && xargs -a ../excludeFromPublicBuild.txt rm -f {}"
  zip archive: true, dir: 'staticAssets', glob: '', zipFile: "static${tag}.zip"
  stash name: "staticAssets${tag}", includes: "static${tag}.zip"
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
    LOG_LEVEL = 'error'
  }
  parameters {
    string(name: 'SLACK_CHANNEL', defaultValue: '#simorgh-alerts', description: 'The Slack channel where the build status is posted.')
    booleanParam(name: 'SKIP_OOH_CHECK', defaultValue: false, description: 'Allow Simorgh deployment to LIVE outside the set Out of Hours (O.O.H) time span.')
  }
  stages {
    stage ('Install Dependencies') {
      agent {
        docker {
          image "${nodeImage}"
          reuseNode true
        }
      }
      steps {
        installDependencies()
      }
    }
    stage ('Build Static Assets') {
      when {
        expression { env.BRANCH_NAME == 'latest' }
      }
      failFast true
      agent {
        docker {
          image "${nodeImage}"
          reuseNode true
        }
      }
      steps {
        buildStaticAssets("test", "TEST")
        buildStaticAssets("live", "LIVE")
      }
      post {
        always {
          script {
            stageName = env.STAGE_NAME
          }
        }
      }
    }
    stage ('Prepare for Deployment') {
      when {
        expression { env.BRANCH_NAME == 'latest' }
      }
      agent {
        docker {
          image "${nodeImage}"
          reuseNode true
        }
      }
      steps {
        script {
          getCommitInfo()
          Simorgh.setBuildMetadataLegacy('simorgh', env.BUILD_NUMBER, appGitCommit) // Set Simorgh build metadata
        }

        pruneDevDependencies()

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
    stage ('Run Pipeline') {
      when {
        expression { env.BRANCH_NAME == 'latest' }
      }
      options {
        // Do not perform the SCM step
        skipDefaultCheckout true
      }
      steps {
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
          if (run.buildVariables.COSMOS_VERSION) {
            currentBuild.description = "Cosmos release ${run.buildVariables.COSMOS_VERSION}"
          }
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
