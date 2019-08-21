#!/usr/bin/env groovy

import groovy.json.JsonOutput;

def dockerRegistry = "329802642264.dkr.ecr.eu-west-1.amazonaws.com"
def nodeImageVersion = "10.16.0-1"
def nodeImage = "${dockerRegistry}/bbc-news/node-10-lts:${nodeImageVersion}"


class BuildTag {
  private String name;
  private String number;
  private String url;
  private String commit;
  private String commitAuthor;
  private String commitMessage;

  public BuildTag(name, number, url, commit, commitAuthor, commitMessage) {
    this.name = name;
    this.number = number;
    this.url = url;
    this.commit = commit;
    this.commitAuthor = commitAuthor;
    this.commitMessage = commitMessage;
  }
  public getBuildName(){
    return this.name;
  }
  public getBuildNumber(){
    return this.number;
  }
  public getBuildUrl(){
    return this.url;
  }
  public getCommit(){
    return this.commit;
  }
  public getCommitAuthor(){
    return this.commitAuthor;
  }
  public getCommitMessage(){
    return this.commitMessage;
  }
}

def appGitCommit = ""
def appGitCommitAuthor = ""
def appGitCommitMessage = ""
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
  sh 'make install'
  sh 'make productionTests'
  sh 'npm prune --production'
}

def getCommitInfo = {
  appGitCommit = sh(returnStdout: true, script: "git rev-parse HEAD")
  appGitCommitAuthor = sh(returnStdout: true, script: "git --no-pager show -s --format='%an' ${appGitCommit}").trim()
  appGitCommitMessage = sh(returnStdout: true, script: "git log -1 --pretty=%B").trim()
}

def createBuildTag() { 
  // Remove any tags that exist currently
  sh 'rm -f ./pack/build_tag.json'

  // Get Simorgh commit information
  getCommitInfo()

  BuildTag build = new BuildTag(env.JOB_NAME, env.BUILD_NUMBER, env.BUILD_URL, appGitCommit, appGitCommitAuthor, appGitCommitMessage)
  def json = JsonOutput.toJson(build)
  new File("/pack/build_tag.json").write(json)
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
    buildDiscarder(logRotator(daysToKeepStr: '10', artifactDaysToKeepStr: '10'))
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
            sh 'mkdir pack'
            createBuildTag()
            sh 'cat ./pack/build_tag.json'
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
            withCredentials([string(credentialsId: 'simorgh-chromatic-app-code', variable: 'CHROMATIC_APP_CODE')]) {
              runDevelopmentTests()
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

            // Moving files necessary for production to `pack` directory.
            sh "./scripts/jenkinsProductionFiles.sh"

            createBuildTag()

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
      getCommitInfo()
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
