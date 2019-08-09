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
  sh 'rm -rf staticAssets && mkdir staticAssets'
  sh "npm run build:$env"
  sh "cp -R build/. staticAssets"
  sh "cd staticAssets && xargs -a ../excludeFromPublicBuild.txt rm -f {}"
  zip archive: true, dir: 'staticAssets', glob: '', zipFile: "static${tag}.zip"
  sh 'rm -rf staticAssets'
}

def zipProdBuild() {
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

  zip archive: true, dir: 'pack/', glob: '', zipFile: packageName
}

node {
  // options {
  //     timeout(time: 90, unit: 'MINUTES')
  //     timestamps ()
  // }
  environment {
      APP_DIRECTORY = "app"
      CI = true
  }
  parameters {
      string(name: 'SLACK_CHANNEL', defaultValue: '#si_repo-simorgh', description: 'The Slack channel where the build status is posted.')
      booleanParam(name: 'SKIP_OOH_CHECK', defaultValue: false, description: 'Allow Simorgh deployment to LIVE outside the set Out of Hours (O.O.H) time span.')
  }

  checkout scm

  docker.image("${nodeImage}").inside('-u root -v /etc/pki:/certs') {
    stage ('Install & Build') {
      sh 'make install'

      stage ('Development Tests & Packaging') {
        parallel (
          'Dev Tests': {
              // sh 'npm run test'
              sh 'true'
          },

          'ChromaticQA Tests': {
            sh 'true'
            // sh 'npx chromatic test --app-code="" --build-script-name build:storybook || true'
            // withCredentials([string(credentialsId: 'simorgh-chromatic-app-code', variable: 'CHROMATIC_APP_CODE')]) {
            //   // sh 'npm run test:chromatic'
            //   sh 'true'
            // }
          },

          'Zip Prod Build': {
            if (env.BRANCH_NAME != 'latest') {
              zipProdBuild()
            }
          },

          'Zip Storybook': {
            if (env.BRANCH_NAME != 'latest') {
              zip archive: true, dir: 'storybook_dist', glob: '', zipFile: storybookDist              }
          },

          'Zip Static Assets': {
            if (env.BRANCH_NAME != 'latest') {
              buildStaticAssets("test", "TEST")
              buildStaticAssets("live", "LIVE")
            }
        )
      }

        stage ('Production Tests') {
          'Production Tests': {
            // sh 'npm run build && xvfb-run npm run test:prod:ci;'
            sh 'true'
          }
        }

      stage ('CD: TEST') {
        if (env.BRANCH_NAME != 'latest') {
          sh 'true'
          // build(
          //   job: 'simorgh-infrastructure-test/latest',
          //   parameters: [
          //     [$class: 'StringParameterValue', name: 'APPLICATION_BRANCH', value: env.BRANCH_NAME],
          //     booleanParam(name: 'SKIP_OOH_CHECK', value: params.SKIP_OOH_CHECK)
          //   ],
          //   propagate: true,
          //   wait: true
          // )
        }
      }
    }
  }
}