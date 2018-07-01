# Simorgh

Named Simorgh after the Persian mythological bird. The Simorgh is the amalgam of many birds (and in some accounts other animals) into one. We consider this an apt metaphor for all articles of the BBC in one solution, a clear reference to the international nature of our teams but also to the articles themselves working for international users from the outset. It is also a unique name which is practical and, more superfically, the bird is very pretty.

[![Build Status](https://travis-ci.org/bbc/simorgh.svg?branch=latest)](https://travis-ci.org/bbc/simorgh) [![Test Coverage](https://api.codeclimate.com/v1/badges/cbca275e184057982f27/test_coverage)](https://codeclimate.com/github/bbc/simorgh/test_coverage) [![Known Vulnerabilities](https://snyk.io/test/github/bbc/simorgh/badge.svg)](https://snyk.io/test/github/bbc/simorgh) [![Greenkeeper badge](https://badges.greenkeeper.io/bbc/simorgh.svg)](https://greenkeeper.io/) [![Maintainability](https://api.codeclimate.com/v1/badges/cbca275e184057982f27/maintainability)](https://codeclimate.com/github/bbc/simorgh/maintainability)

## Installation

Install Node 8. [https://nodejs.org/en/](https://nodejs.org/en/)
Update to use the latest npm `npm i -g npm`

```
git clone git@github.com:bbc/simorgh.git
npm install
```

## Local Development

To run this application locally, with hot-reloading, run: `npm run dev`.

The application will start on [http://localhost:7080/article/scenario-id](http://localhost:7080/article/scenario-id).

These is a single route, `/article/:id`, where `id` is the filename of the static Article data, for example `scenario-01`.

**NOTE:** the `id` parameter is currently redundant as the Article component is hard-coded to fetch data from [scenario-01](https://github.com/bbc/simorgh/blob/latest/data/test/scenario-01.json). Furthermore, the Article component does not do anything with that data.

### Storybook (UI Development Environment/Style Guide)

To run locally `npm run storybook`, it will then be available at [http://localhost:9001/](http://localhost:9001/). Introduction to and documentation for Storybook is here: [https://storybook.js.org/basics/introduction/](https://storybook.js.org/basics/introduction/).

## Production build

To run this application locally with a production build, run:
`npm run build && npm run start`

To avoid indexing by search engines during our early development, there is a `nofollow` page level meta tag in `Document.jsx`.

To view a breakdown of the bundle size, open the generated html report in a browser `./reports/webpackBundleReport.html` This is generated via `webpack-bundle-analyzer`. We have have this data in json `./reports/webpackBundleReport.json`.

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

We use [Lighthouse](https://github.com/googlechrome/lighthouse) to test the performance of our page. For running the tests locally we need two terminals running:

1. [Start the production server](https://github.com/bbc/simorgh#production-build)
2. `npm run lighthouse` runs our Lighthouse tests.

Lighthouse will output html reports to the `reports` folder. It will also open a HTML report in your browser allowing an individual to clearly see the best practice score of the page along with the audits that were run against it.

### To-do
* `nofollow` must be removed once this repo is ready for production use
