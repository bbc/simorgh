# Contributing

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/simorgh/blob/latest/.github/CODE_OF_CONDUCT.md). Please take a moment to read it.

We are particularly looking for help with our [open issues](https://github.com/bbc/simorgh/issues). We appreciate all forms of contribution - not just code - that can include documentation, clarifications, typo corrections and much more.

## Documentation index

Please familiarise yourself with our:

- [Code of conduct](https://github.com/bbc/simorgh/blob/latest/.github/CODE_OF_CONDUCT.md)
- [Coding Standards](https://github.com/bbc/simorgh/blob/latest/docs/Coding-Standards/README.md)
- [Contributing guidelines](https://github.com/bbc/simorgh/blob/latest/CONTRIBUTING.md) (you are here)
- [Guide to Code Reviews](https://github.com/bbc/simorgh/blob/latest/docs/Code-Reviews.mdx)
- [GPG Signing Guide](https://github.com/bbc/simorgh/blob/latest/docs/GPG-Signing-Guide.mdx)
- [Primary README](https://github.com/bbc/simorgh/blob/latest/README.md)
- [Recommended Tools](https://github.com/bbc/simorgh/blob/latest/docs/Recommended-Tools.mdx)
- [Troubleshooting](https://github.com/bbc/simorgh/blob/latest/docs/Troubleshooting.mdx)

NB there is further documentation colocated with relevant code. The above list is an index of the top-level documentation of our repo.

## Getting started

Before starting a pull request, firstly search through [existing issues](https://github.com/bbc/simorgh/issues). Please also ensure to branch from latest, we only review PRs that are as small as they can be; which we do to maximise productivity.

If the work you want to carry out is not captured in an issue, please open one. Otherwise you risk spending a lot of time working on something that the project's developers might not want to merge into the project.

There are issue templates available for bug fix and feature requests, so you know what details to include.

## Pull Requests

If you never created a pull request before, [here is a great tutorial on how to send a PR](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github).

### Project setup

Fork the project, clone your fork, configure the remotes and install the dependencies:

1. Clone your fork of the repo into the current directory

   ```
   git clone https://github.com/<YOUR ACCOUNT>/simorgh.git
   ```

2. Navigate to the newly cloned directory

   ```
   cd simorgh
   ```

3. Assign the original repo to a remote called "upstream"

   ```
   git remote add upstream https://github.com/bbc/simorgh
   ```

4. Use recommended version of node for the project, listed in [`.nvmrc`](https://github.com/bbc/simorgh/blob/latest/.nvmrc)

   ```
   nvm use
   ```

### Installing dependencies

**Install Yarn**

The Simorgh project uses Yarn for package management. To install Yarn, run this command:

```
npm install --global yarn
```

**Install the project dependencies with Yarn**

```
yarn install
```

If it has been a while since you've cloned the repo, pull from the `latest` branch

```
git checkout latest
git pull upstream latest
```

### Your work

> We recommend you have a valid GPG key set up in GitHub. **All commits should be GPG signed** We have a very small [guide](https://github.com/bbc/simorgh/blob/latest/docs/GPG-Signing-Guide.mdx) for setting up GPG signing on macOS. Without the GPG signing, we cannot guarantee that your work will be merged. 

Create a new topic branch (off the main project `latest` branch) that will contain your feature, change, or fix:

```
git checkout -b <topic-branch-name>
```

When committing, please use these commit guidelines:

If you have a breaking change in a commit, prefix the commit message with `BREAKING CHANGE:`

### Run tests

All pull requests need to have linting, unit tests and integration tests passing. For new features, you should add appropriate tests in your PR.

[Instructions for how to run tests are here in the Readme](https://github.com/bbc/simorgh/blob/latest/README.md#tests).

### Writing tests

We use React Testing Library for writing our React component and custom hook unit tests. An introduction to using React Testing Library can be found [here](https://testing-library.com/docs/react-testing-library/intro/).

### Fixture data

We have a lot of [sample data feeds](https://github.com/bbc/simorgh/tree/49a74f2c3b1df0fb1adb6b8bb7fff51ddce55dda/data). These are categorised in directories under this primary directory. Finding useful examples within these folder can be done by searching for the asset (page type) and block types (e.g. paragraph, media etc.) you're looking for.

#### Update local fixture data

Pick a JSON file under `data/news/articles/[id].json`, and:

1. add an example of your block somewhere in the `content.model.blocks` array.
2. add your new component to the `blockTypes` array.

Run `yarn dev` and you should see your component at your article of choice, eg http://localhost:7080/news/articles/c0000000001o

### Merging a Pull Request

There is a [guide](https://github.com/bbc/simorgh-infrastructure/blob/latest/documentation/MERGE_PROCESS.md) for BBC staff which documents the manual process that should be followed before merging a PR. Please note: The guide links through to our CI endpoints and therefore is hosted in a private repository.

### `.env` is showing in my `git status`

The `.env` file should not be commited as it is often overwritten by the values in `envConfig/` at build time. There is a `postshrinkwrap` command which runs after an `yarn install` so should be run during setup of the application.

If the `.env` file is appearing in your `git status` it means it is now longer being assumed as unchanged, to fix this run:

```
git update-index --assume-unchanged .env
```
