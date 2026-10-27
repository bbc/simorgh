# Next.js App

This is the directory that houses the Next.js version of Simorgh.

The Next.js app shares components from the Express app (found in the root of the project). It is intended to be used for new page types, and in the future, will be used for the entire site.

For more information on Next.js and how to use the framework, see the [Next.js documentation](https://nextjs.org/docs).

**Note:** We currently use the 'Pages Router' in Next.js, so be sure to select the "Using Pages Router" tab when viewing the Next.js documentation.

---

## React Compiler

The Next.js app enables React Compiler for all services through Next.js configuration. It runs during `next dev` and `next build`, including for shared components imported by the Next.js app. Next.js applies these optimizations to client-side code; server rendering is unchanged.

React Compiler automatically memoizes components and hooks when it can do so safely, and skips code it cannot safely compile. Existing manual `memo`, `useMemo`, and `useCallback` calls do not need to be removed.

If a diagnosed compiler issue requires an opt-out, add `'use no memo';` at the beginning of the affected function (or module). Use this as a temporary, scoped escape hatch while the issue is investigated.

---

## Setup

- Run `yarn install` to install dependencies
- Run `yarn dev` to start the development server on `http://localhost:7081`
- Navigate to `http://localhost:7081/pidgin/live/c7p765ynk9qt` to see the page

## Running Unit and E2E tests

- Run `yarn test` to run the Next.js unit tests (`Unit Tests (Next)`) through the shared root `../jest.config.ts`
- Run `yarn test:e2e` to run all e2e tests

## Running Integration tests

- Navigate to the root of the project (up one level from here)
- Run `yarn test:integration` to run the Canonical, AMP and Lite integration projects through the shared root `../jest.config.ts`
- Run `yarn test:integration -u` to run all integration tests and update any snapshots for the app

## Running Storybook

- Navigate to the root of the project (up one level from here)
- Run `yarn storybook` to start the Storybook server (it should open automatically in your browser)
