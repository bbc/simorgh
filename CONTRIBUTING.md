# Contributing

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/simorgh/blob/latest/.github/CODE_OF_CONDUCT.md). Please take a moment to read it.

We are particularly looking for help with our [open issues](https://github.com/bbc/simorgh/issues). We appreciate all forms of contribution - not just code - that can include documentation, clarifications, typo corrections and much more.

## Documentation index

Please familiarise yourself with our:

- [Code of conduct](https://github.com/bbc/simorgh/blob/latest/.github/CODE_OF_CONDUCT.md)
- [Code Standards](https://github.com/bbc/simorgh/blob/latest/docs/Code-Standards.md)
- [Contributing guidelines](https://github.com/bbc/simorgh/blob/latest/CONTRIBUTING.md) (you are here)
- [Github Project Board Guide](https://github.com/bbc/simorgh/blob/latest/docs/Project-Board-Guide.md)
- [GPG Signing Guide](docs/GPG-Signing-Guide.md)
- [Primary README](https://github.com/bbc/simorgh/blob/latest/README.md)

NB there is further documentation colocated with relevant code. The above list is an index of the top-level documentation of our repo.

## Getting started

Before starting a pull request, firstly search through [existing issues](https://github.com/bbc/simorgh/issues). Please also ensure to branch from latest, we only review PRs that are as small as they can be; which we do to maximise productivity.

If the work you want to carry out is not captured in an issue, please open one. Otherwise you risk spending a lot of time working on something that the project's developers might not want to merge into the project.

There are issue templates available for bug fix and feature requests, so you know what details to include.

Once you find an issue you would like to work on, please see this [guide about our project board workflow](https://github.com/bbc/simorgh/blob/latest/docs/Project-Board-Guide.md)

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

> Make sure you have a valid GPG key set up in GitHub. **All commits must be GPG signed** We do have a very small [guide](docs/GPG-Signing-Guide.md) for setting up GPG signing on MacOS.

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

[Instructions for how to run tests are here in the Readme](https://github.com/bbc/simorgh/blob/latest/README.md#tests).

### Writing tests

For new components, we write Jest Snapshot tests, with a deep render, using the `shouldMatchSnapshot` test utility function.

For new containers, we write Jest Snapshot tests with a shallow render, using the `shouldShallowMatchSnapshot` test utility function. We also write assertion-based enzyme tests to capture variations in prop values. [See the Article `getInitialProps` tests here as an example.](https://github.com/bbc/simorgh/blob/latest/src/app/containers/Article/index.test.jsx)

### Run tests on your fork

We use Travis CI as our continuous integration tool. It runs our linting, unit tests and integration tests on each commit and each Pull Request. PRs from your fork to the bbc/simorgh repo will be run by our TravisCI setup with no changes needed on your fork.

To run these on your forked version follow these steps.

- [Follow the steps in Project Setup](#project-setup)
- Visit [travis-ci.org](https://travis-ci.org)
- Log in with your Github account where you've forked this repo to
- Go to [https://travis-ci.org/YourGithubUsername/simorgh](https://travis-ci.org/YourGithubUsername/simorgh)
- Go to your Travis CI profile page and turn 'on' the toggle for the repository [https://travis-ci.org/profile/YourGithubUsername](https://travis-ci.org/profile/YourGithubUsername). You can also change the settings on your repo at will.
- Now go to your Readme and update line 3 - to instead of using `bbc/simorgh` to use `YourGithubUsername/simorgh` - this will mean that Travis will look at your fork of Simorgh and run the tests against that.
- Now create a branch and start committing and pushing to it!
- You should see Travis CI and codecoverage now running against your branch and PRs within your fork. :white_check_mark:

**Note**: The code coverage, CC_TEST_REPORTER_ID, is defined in [.travis.yml](.travis.yml#L3). As such, you don't need to obtain the CC_TEST_REPORTER_ID from CodeClimate and configure it in the repository settings in Travis CI. This is because, the [.travis.yml](.travis.yml#L3) takes precedence over the value configured in repository settings. See the [Travis CI public variables guide](https://docs.travis-ci.com/user/environment-variables/#defining-public-variables-in-travisyml) for more details.

### Fixture data

We have a lot of [sample data feeds](https://github.com/bbc/simorgh/tree/49a74f2c3b1df0fb1adb6b8bb7fff51ddce55dda/data). These are categorised in directories under this primary directory. Finding useful examples within these folder can be done by searching for the asset (page type) and block types (e.g. paragraph, media etc.) you're looking for.

#### Update local fixture data

Pick a JSON file under `data/news/articles/[id].json`, and:

1. add an example of your block somewhere in the `content.model.blocks` array.
2. add your new component to the `blockTypes` array.

Run `npm run dev` and you should see your component at your article of choice, eg http://localhost:7080/news/articles/c0000000001o

#### Update the schema

data/schema.yaml describes the Article API definition for web. We need to make it aware of our new component.

Your component is more than likely a new 'block' in the data feed, so you'll need to add it to the array of which blocks the application should validate:

```yaml
    blocks:
      type: object
      items:
        oneOf:
          - $ref: '#/components/schemas/altText'
          ... etc ...
          - $ref: '#/components/schemas/[your component name]'
      minItems: 2
```

You'll also need to define the block subtype itself:

```yaml
blockquote:
  type: object
  required:
    - model
    - type
  properties:
    model:
      properties:
        blocks:
          $ref: '#/components/schemas/blocks'
      type: object
    type:
      enum:
        - blockquote
      type: string
```

The schema check currently only happens on local data.

### Create the container

We've added our _component_, which should be kept as simple as possible. Now we need to create our _container_, which contains the business logic for mapping Optimo block data to the React parameters our component needs.

Add a new folder under `src/app/containers/[Component Name]/`. You will need:

- index.jsx - describes the mapping of Optimo block data to React parameters
- index.test.jsx - creates "snapshots" of the component with the various different rendered outputs for the business logic in the container

This step is quite complicated, so copy and paste from a similar example and tweak the code to your requirements.

### Merging a Pull Request

There is a [guide](https://github.com/bbc/simorgh-infrastructure/blob/latest/documentation/MERGE_PROCESS.md) for BBC staff which documents the manual process that should be followed before merging a PR. Please note: The guide links through to our CI endpoints and therefore is hosted in a private repository.

### Note: Adding files to the root of simorgh

As part of our deployment & pipeline work, we have created a handy script to copy only the production files to a separate directory. The script `/script/jenkinsProductionFiles.sh` will delete node_modules, create a `pack` directory and copy all relevant configuration files and the necessary directories. Adding files to the `/src` or `/cypress` directory will not be an issue, when the code is deployed.

If on the other hand you are adding new files to the root directory of simorgh, and these files are necessary for production, you have to manually add the copy commands for the relevant files to the `/script/jenkinsProductionFiles.sh`.

### `.env` is showing in my `git status`

The `.env` file should not be commited as it is often overwritten by the values in `envConfig/` at build time. There is a `postshrinkwrap` command which runs after an `npm install` so should be run during setup of the application.

If the `.env` file is appearing in your `git status` it means it is now longer being assumed as unchanged, to fix this run:

```
git update-index --assume-unchanged .env
```
