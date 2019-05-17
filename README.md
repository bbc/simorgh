# Simorgh

[![Build Status](https://travis-ci.org/bbc/simorgh.svg?branch=latest)](https://travis-ci.org/bbc/simorgh) [![Test Coverage](https://api.codeclimate.com/v1/badges/cbca275e184057982f27/test_coverage)](https://codeclimate.com/github/bbc/simorgh/test_coverage) [![Known Vulnerabilities](https://snyk.io/test/github/bbc/simorgh/badge.svg)](https://snyk.io/test/github/bbc/simorgh) [![Maintainability](https://api.codeclimate.com/v1/badges/cbca275e184057982f27/maintainability)](https://codeclimate.com/github/bbc/simorgh/maintainability) [![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://bbc.github.io/simorgh/)

Named Simorgh after the Persian mythological bird. The Simorgh is the amalgam of many birds (and in some accounts other animals) into one.

Whilst Simorgh was originally created within the BBC to enable all articles to be published via a single technical solution, its use case is now expanding to include a wider range of content types.

Happily, a metaphor which seemed apt for offering all BBC articles in one solution is perhaps now even more appropriate as the application evolves to support more content types. It’s also a clear reference to the international nature of our teams, but also to the desire to ensure articles (and everything which has followed) works for users in all languages the BBC supports.

It is also a unique name which is practical and, more superficially, the bird is very pretty.

## Overview

Simorgh is a universal react renderer, built on [react-universal-app](https://github.com/jtart/react-universal-app/blob/master/README.md). This repo is publicly accessible and the application will be used to generate the future, pan-BBC article.

It currently has an embedded components library which will be split out as the number of components grow.

We have a continuous deployment pipeline which automatically deploys all changes to live within a hour of merge (soon to be much shorter).

## Installation

Install Node 10. [https://nodejs.org/en/](https://nodejs.org/en/). We currently use v10.15.3 and if you have a node version manager (nvm) you can run the following script to automatically change to the project supported version.

```
nvm use
```
Update to use the latest npm `npm i -g npm`

```
git clone git@github.com:bbc/simorgh.git
cd simorgh
npm install
```

## Local Development

To run this application locally, with hot-reloading, run: `npm run dev`.

The application will start on [http://localhost:7080](http://localhost:7080). To view an article, visit this url
[http://localhost:7080/news/articles/c0000000001o](http://localhost:7080/news/articles/c0000000001o).

The route is `/news/articles/:id`, where `id` is the filename of the static Article data, for example `c0000000001o`.

Articles 25 & 27 are available on the Production environment as well as locally. These can be used for testing.
[http://localhost:7080/news/articles/cl55zn0w0l4o](http://localhost:7080/news/articles/cl55zn0w0l4o)
[http://localhost:7080/news/articles/cn7769kpk9mo](http://localhost:7080/news/articles/cn7769kpk9mo).

There is also an AMP route at `/news/articles/:id.amp` with the article being AMP-compatible. [https://www.ampproject.org](https://www.ampproject.org)

### Storybook (UI Development Environment/Style Guide)

We use Storybook for developing components in isolation from the Simorgh Application. You can access this at [https://bbc.github.io/simorgh/](https://bbc.github.io/simorgh/)

To run locally `npm run storybook`, it will then be available at [http://localhost:9001/](http://localhost:9001/). Introduction to and documentation for Storybook is here: [https://storybook.js.org/basics/introduction/](https://storybook.js.org/basics/introduction/).

## Production build locally

To run this application locally with a production build, run:
`npm run build && npm run start`.

We use `npm run build` locally which bundles the application pointing at localhost for data and static assets.

To avoid indexing by search engines during our early development, there is a `nofollow` page level meta tag in `Document.jsx`.

## Using environment builds locally

This is mainly used for debugging `latest` using the TEST and LIVE environment bundles. Ensure that the bundles exist in the static asset location for the correct environment before starting to debug.

To run TEST bundles on localhost:
- In `envConfig/test.env` change the value of `LOG_DIR='/var/log/simorgh'` to `LOG_DIR='log'`
- Then run `rm -rf build && npm run build:test && npm run start`
- Visit a test article: http://localhost:7080/news/articles/cn7769kpk9mo

To run LIVE bundles on localhost:
- In `envConfig/live.env` change the value of `LOG_DIR='/var/log/simorgh'` to `LOG_DIR='log'`
- Then run `rm -rf build && npm run build:live && npm run start`
- Visit a live article: http://localhost:7080/news/articles/c8xxl4l3dzeo

## Production build on CI

On deployment `npm run build:ci` is run in the CI environment which creates bundles for both the `test` and `live` environments. On the two environments the `.env.test` or `.env.live` files overwrite the `.env` file which is used to run the application with the correct bundles.

### Bundle analysis reports

Every run of `npm run build:ci` will update the bundle analysis files in the repo. To view a breakdown of the bundle size, open the generated html report in a browser `./reports/webpackBundleReport.html` This is generated via `webpack-bundle-analyzer`. The data is also available as json `./reports/webpackBundleReport.json`.

## Tests

### Linting and unit tests

We have linting with the [Airbnb styleguide](https://github.com/airbnb/javascript/tree/master/react) and we use [Prettier](https://github.com/prettier/prettier) as a code formatter. They can be run with `npm run test:lint`.

We have [Jest](https://facebook.github.io/jest) unit tests that can be run with `npm run test:unit`.

`npm test` runs both sets of these.

### End-to-end tests

#### Main application

We use [Cypress](https://www.cypress.io/) for our end-to-end tests. For running the tests locally, run this single command:

```
npm run test:e2e
```

It will spin up a production server on port 7080 and run the Cypress tests against that.

Further details on using the Cypress CLI can be found at https://docs.cypress.io/guides/guides/command-line.html

Cypress can be run interactively using `npm run test:e2e:interactive`. This loads a user interface which easily allows for indivdual tests to be run alongside a visual stream of the browser, as the tests run.

#### Storybook

We also have a [Cypress](https://www.cypress.io/) project which runs a different set of end-to-end tests on [Storybook](https://github.com/bbc/simorgh#storybook-ui-development-environmentstyle-guide). For running the tests locally we need two terminals running:

1. `npm run storybook` with the application,
2. `npm run test:storybook` with the Cypress integration tests.

### Lighthouse Best Practice tests

We use [Lighthouse](https://github.com/googlechrome/lighthouse) to test the performance of our page. However these have been moved out of Simorgh down to our own internal CD processes. This allows us to run these tests on a more accurate depiction of Simorgh. You are free to run lighthouse on your own from your Chrome browser or use the Node Lighthouse CLI.  

### To-do

- `nofollow` must be removed once this repo is ready for production use
