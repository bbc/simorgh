# Simorgh

[![Known Vulnerabilities](https://snyk.io/test/github/bbc/simorgh/badge.svg)](https://snyk.io/test/github/bbc/simorgh) [![Greenkeeper badge](https://badges.greenkeeper.io/bbc/simorgh.svg)](https://greenkeeper.io/) [![Maintainability](https://api.codeclimate.com/v1/badges/cbca275e184057982f27/maintainability)](https://codeclimate.com/github/bbc/simorgh/maintainability)

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

To run linting and unit tests, run: `npm test`

### End to end tests

We use [Cypress](https://www.cypress.io/) for our E2E tests. For running the tests locally we need multiple terminals running, one with the server running `npm run dev` and then another to run the test suite `npm run test:e2e`.

Tests can also be run in isloation like this `npm run test:e2e -- --spec cypress/integration/article_spec.js`. Further details on using the Cypress CLI can be found at https://docs.cypress.io/guides/guides/command-line.html

For a more detailed E2E testing experience Cypress can be run interactively using `npm run test:e2e:interactive`. This loads a UI which easily allows for indivdual tests to be run and a visual stream of the browser while the tests run.
