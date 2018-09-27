# Contributing

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc-news/simorgh/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

We are particularly looking for help with our [open issues](https://github.com/bbc-news/simorgh/issues). We appreciate all forms of contribution - not just code - that can include documentation, clarifications, typo corrections and much more.

## Getting started

Before starting a pull request, firstly search through [existing issues](https://github.com/bbc-news/simorgh/issues). Please also ensure to branch from latest, we only review PRs that are as small as they can be; which we do to maximise productivity.

If the work you want to carry out is not captured in an issue, please open one. Otherwise you risk spending a lot of time working on something that the project's developers might not want to merge into the project.

There are issue templates available for bug fix and feature requests, so you know what details to include.

## Pull Requests

If you never created a pull request before, [here is a great tutorial on how to send a PR](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github).

### Project setup

Fork the project, clone your fork, configure the remotes and install the dependencies:

```
# Clone your fork of the repo into the current directory
git clone https://github.com/<YOUR ACCOUNT>/simorgh.git
# Navigate to the newly cloned directory
cd simorgh
# Assign the original repo to a remote called "upstream"
git remote add upstream https://github.com/bbc-news/simorgh
# Use recommended version of node for the project, listed in `.nvmrc`
nvm use
# Install latest version of npm
npm install --global npm@latest
# Install the project dependencies
npm install
```

If it has been a while since you've cloned the repo, pull from the `latest` branch

```
git checkout latest
git pull upstream latest
```

### Your work

Create a new topic branch (off the main project `latest` branch) that will contain your feature, change, or fix:

```
git checkout -b <topic-branch-name>
```

When committing, please use these commit guidelines:

If you have a breaking change in a commit, prefix the commit message with `BREAKING CHANGE:`

### Naming conventions

- Component and Container directories should be capitalised as per the React convention, e.g. `/Headline/`
- Test files should follow the dot notation as per the Jest convention, e.g. `index.test.jsx`
- Stories should follow the dot notation as per the Storybook convention, e.g. `index.stories.jsx`
- Files and directories should be camelCase, e.g. `storyBody.jsx`
- The main entry file in a directory should be named `index.[extension]` e.g. `Headline/index.jsx` and `server/index.js`
- Static assets e.g. `icon-128x128.png` do not need to be camelCased.

### Run tests

All pull requests need to have linting, unit tests and integration tests passing. For new features, you should add appropriate tests in your PR.

[Instructions for how to run tests are here in the Readme](https://github.com/bbc-news/simorgh/blob/latest/README.md#tests).

### Writing tests

For new components, we write Jest Snapshot tests, with a deep render, using the `shouldMatchSnapshot` test utility function.

For new containers, we write Jest Snapshot tests with a shallow render, using the `shouldShallowMatchSnapshot` test utility function. We also write assertion-based enzyme tests to capture variations in prop values. [See the Article `getInitialProps` tests here as an example.](https://github.com/bbc-news/simorgh/blob/latest/src/app/containers/Article/index.test.jsx)

### Run tests on your fork

We use Travis CI as our continuous integration tool. It runs our linting, unit tests and integration tests on each commit and each Pull Request. PRs from your fork to the bbc-news/simorgh repo will be run by our TravisCI setup with no changes needed on your fork.

To run these on your forked version follow these steps.

- [Follow the steps in Project Setup](#project-setup)
- Visit [travis-ci.org](https://travis-ci.org)
- Log in with your Github account where you've forked this repo to
- Go to [https://travis-ci.org/YourGithubUsername/simorgh](https://travis-ci.org/YourGithubUsername/simorgh)
- Go to your Travis CI profile page and turn 'on' the toggle for the repository [https://travis-ci.org/profile/YourGithubUsername](https://travis-ci.org/profile/YourGithubUsername). You can also change the settings on your repo at will.
- Now go to your Readme and update line 3 - to instead of using `bbc-news/simorgh` to use `YourGithubUsername/simorgh` - this will mean that Travis will look at your fork of Simorgh and run the tests against that.
- To setup CodeClimate you need to login to the 'quality' option on [https://codeclimate.com/](https://codeclimate.com/) and obtain a code coverage [CC_TEST_REPORTER_ID](https://docs.codeclimate.com/docs/finding-your-test-coverage-token), this then needs to be added as an environment variable in TravisCI (see the TravisCI settings page).
- Now create a branch and start committing and pushing to it!
- You should see Travis CI and codecoverage now running against your branch and PRs within your fork. :white_check_mark:
