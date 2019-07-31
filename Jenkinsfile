#!/usr/bin/env groovy

def dockerRegistry = "329802642264.dkr.ecr.eu-west-1.amazonaws.com"
def nodeImageVersion = "10.16.0-1"
def nodeImage = "${dockerRegistry}/bbc-news/node-10-lts:${nodeImageVersion}"

def appGitCommit = ""
def appGitCommitAuthor = ""
def appGitCommitMessage = ""
def buildTagText = ""
def messageColor = 'danger'

def stageName = ""
def packageName = 'simorgh.zip'
def storybookDist = 'storybook.zip'
def staticAssetsDist = 'static.zip'

def runDevelopmentTests(){
  sh 'make install'
  sh 'make developmentTests'
}

def runProductionTests(){
  sh 'make installProd'
  sh 'make productionTests'
}

def getCommitInfo = {
  appGitCommit = sh(returnStdout: true, script: "git rev-parse HEAD")
  appGitCommitAuthor = sh(returnStdout: true, script: "git --no-pager show -s --format='%an' ${appGitCommit}").trim()
  appGitCommitMessage = sh(returnStdout: true, script: "git log -1 --pretty=%B").trim()
}

def setBuildTagInfo(gitCommit, gitCommitAuthor, gitCommitMessage) {
  """
  *${env.JOB_NAME} [build #${env.BUILD_NUMBER}]*
  ${env.BUILD_URL}
  *Author*: ${gitCommitAuthor}
  *Commit Hash*
  ${gitCommit}
  *Commit Message*
  ${gitCommitMessage}
  """
}

def messageContent(title, text, stageName, gitCommit, gitCommitMessage) {
  "${env.JOB_NAME}\n ${title}\n ${env.BUILD_URL}\n ${text}\n\
    *Stage*: ${stageName}\n\
    *Commit Hash*\n ${gitCommit}\n\
    *Commit Message*\n ${gitCommitMessage}"
}

def notifySlack(messageParameters) {
  def title = "*${messageParameters.buildStatus} on \"${messageParameters.branchName}\" [build #${env.BUILD_NUMBER}]*"

  def text = "*Author*: ${messageParameters.gitCommitAuthor}"

  def message = messageContent(title, text,
    messageParameters.stageName, messageParameters.gitCommit,
    messageParameters.gitCommitMessage
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
  parameters {
    string(name: 'SLACK_CHANNEL', defaultValue: '#si_repo-simorgh', description: 'The Slack channel where the build status is posted.')
    booleanParam(name: 'SKIP_OOH_CHECK', defaultValue: false, description: 'Allow Simorgh deployment to LIVE outside the set Out of Hours (O.O.H) time span.')
  }
  stages {
    stage ('Build and Test') {
      when {
        expression { env.BRANCH_NAME != 'latest' }
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
            withCredentials([string(credentialsId: 'simorgh-chromatic-app-code', variable: 'CHROMATIC_APP_CODE')]) {
              runDevelopmentTests()
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
            runDevelopmentTests()
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

            // Moving files necessary for production to `pack` directory.
            sh "./scripts/jenkinsProductionFiles.sh"

            script {
              // Get Simorgh commit information
              getCommitInfo()
              
              // Set build tag information
              buildTagText = setBuildTagInfo(appGitCommit, appGitCommitAuthor, appGitCommitMessage)
            }

            // Write commit information to build_tag.txt
            sh "./scripts/signSimorghArchive.sh \"${buildTagText}\""

            sh "rm -f ${packageName}"
            zip archive: true, dir: 'pack/', glob: '', zipFile: packageName
            stash name: 'simorgh', includes: packageName
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
        unstash 'simorgh'
        build(
          job: 'simorgh-infrastructure-test/latest',
          parameters: [
            [$class: 'StringParameterValue', name: 'APPLICATION_BRANCH', value: env.BRANCH_NAME],
            booleanParam(name: 'SKIP_OOH_CHECK', value: params.SKIP_OOH_CHECK)
          ],
          propagate: true,
          wait: true
        )
      }
    }
  }
  post {
    always {
      script {
        // Get Simorgh commit information
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
            gitCommitMessage: appGitCommitMessage,
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
            gitCommitMessage: appGitCommitMessage,
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
            gitCommitMessage: appGitCommitMessage,
            stageName: stageName,
            slackChannel: params.SLACK_CHANNEL
          ]
          notifySlack(messageParameters)
        }
      }
    }
  }
}
