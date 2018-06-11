# Simorgh

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

The application will start on [http://localhost:7080/](http://localhost:7080/). These is a single route, `/`.

### Storybook (UI Development Environment/Style Guide)

To run locally `npm run storybook`, it will then be available at [http://localhost:9001/](http://localhost:9001/). Introduction to and documentation for Storybook is here: [https://storybook.js.org/basics/introduction/](https://storybook.js.org/basics/introduction/).

## Production build

To run this application locally with a production build, run:

1.  `npm run build`
2.  `npm run start`

## Tests

### Linting and unit tests

We have linting with the [Airbnb styleguide](https://github.com/airbnb/javascript/tree/master/react) and we use [Prettier](https://github.com/prettier/prettier) as a code formatter. They can be run with `npm run test:lint`.

We have [Jest](https://facebook.github.io/jest) unit tests that can be run with `npm run test:unit`.

`npm test` runs both sets of these.

### End-to-end tests

We use [Cypress](https://www.cypress.io/) for our end-to-end tests. For running the tests locally we need two terminals running:

1. `npm run dev` with the application,
2. `npm run test:e2e` with the Cypress integration tests.

Tests can also be run in isolation like this `npm run test:e2e -- --spec cypress/integration/article_spec.js`.
Further details on using the Cypress CLI can be found at https://docs.cypress.io/guides/guides/command-line.html

Cypress can be run interactively using `npm run test:e2e:interactive`. This loads a user interface which easily allows for indivdual tests to be run alongside a visual stream of the browser, as the tests run.

