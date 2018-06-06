# Contributing

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/simorgh/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

We are particularly looking for help with our [open issues](https://github.com/bbc/simorgh/issues). We appreciate all forms of contribution - not just code - that can include documentation, claric

## Getting started

Before starting a pull request, firstly search through [existing issues]( https://github.com/bbc/simorgh/issues).

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
git remote add upstream https://github.com/bbc/simorgh
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

### Run tests

All pull requests with new features should add appropriate unit and integration tests.

You can run linting with ESLint and Prettier and also Jest unit tests with this:

```
npm test
```

To run Cypress integration tests, in one terminal window run:

```
npm run dev
```
and in another window run:

```
npm run test:e2e
```

