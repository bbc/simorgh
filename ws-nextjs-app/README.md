# Next.js App

This is the directory that houses the Next.js version of Simorgh.

The Next.js app shares components from the Express app (found in the root of the project). It is intended to be used for new page types, and in the future, will be used for the entire site.

For more information on Next.js and how to use the framework, see the [Next.js documentation](https://nextjs.org/docs).

**Note:** We currently use the 'Pages Router' in Next.js, so be sure to select the "Using Pages Router" tab when viewing the Next.js documentation.

---

## Setup

- Run `yarn install` to install dependencies
- Run `yarn dev` to start the development server on `http://localhost:7081`
- Navigate to `http://localhost:7081/kyrgyz/live/cz74kjpyk07t` to see the page

## Running Unit and E2E tests

- Run `yarn test` to run all unit tests
- Run `yarn test:e2e` to run all e2e tests

## Running Integration tests

- Navigate to the root of the project (up one level from here)
- Run `yarn test:integration --nextJS` to run all integration tests for the Next.js app
- Run `yarn test:integration:updatesnaphots --nextJS` to run all integration tests and update any snapshots for the Next.js app

## Running Storybook

- Navigate to the root of the project (up one level from here)
- Run `yarn storybook` to start the Storybook server (it should open automatically in your browser)
