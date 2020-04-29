This is where we write integration tests specifically for ensuring that all modules and React components within Simorgh and Psammead are working together to render a full page as expected.

These tests use the [Jest](#what-is-jest) test runner and operate in a custom [JSDOM](#what-is-jsdom) environment.

## Getting started

To run the tests against all 40+ services:
```
npm run test:integration
```

To run tests for a single service with the watch task:
```
npm run test:integration -- --services=amharic --watch
```

To run tests for selected services:
```
npm run test:integration -- --services=korean,persian,amharic
```

To run tests for a single service with the watch task and webpack hot reloading of application code:
```
npm run test:integration -- --services=korean --watch --dev
```

To run tests in CI so they fail if a snapshot was not captured:
```
npm run test:integration:ci
```

To stop running tests immediately when there is a failure - NB this is useful when you want to reduce noise if there are a lot of failing tests and you want to inspect one failing test at a time:
```
npm run test:integration -- --bail
```

Any other Jest CLI args and flags can be passed along in the `test:integration` script.

## How to write tests

Test suites are designed to test a full page that a user can visit at a given url. We test both AMP and canonical platforms for a given page. Most tests we write can be run against both platforms. We refer to these tests as cross platform tests. Some tests need to be written for a specific platform because of the differences in HTML or functionality. When writing tests we need to consider that tests will be run for all 40+ services so they must not be specific to any service or language.

#### Cross platform tests

Tests that can be run in both platforms need to be contained in a file called `crossPlatformTests.js`. An example of a cross platform test would be like:

```js
export default () => {
  it('I can see the headline', () => {
    const h1El = document.querySelector('h1');

    expect(h1El).toBeInTheDocument();
    expect(h1El.textContent).toBeTruthy();
    expect(h1El.textContent).toMatchSnapshot();
  });
};
```

#### AMP only tests

Tests that should be run only on the AMP platform need to be contained in a file called `ampTests.js`. An example of an AMP test would be like

```js
export default () => {
  describe('Analytics', () => {
    it('ATI', () => {
      expect(
        document.querySelector('amp-analytics script[type="application/json"]')
          .textContent,
      ).toMatch('https://logws1363.ati-host.net?');
    });
  });
};
```

#### Canonical only tests

Tests that should be run only on the canonical platform need to be contained in a tests to a file called `canonicalTests.js`. An example of a canonical test would be like

```js
export default () => {
  describe('Analytics', () => {
    it('ATI', () => {
      const noscriptImage = document.querySelector('noscript img');

      expect(noscriptImage.tagName).toEqual('IMG');
      expect(noscriptImage.getAttribute('width')).toEqual('1px');
      expect(noscriptImage.getAttribute('height')).toEqual('1px');
      expect(noscriptImage.getAttribute('src')).toMatch(
        'https://logws1363.ati-host.net?',
      );
    });
  });
};
```

The above tests will not be picked up by the Jest test runner yet because they are just exported functions. The reason we define them as exported functions is, if you remember from [How to write tests](#how-to-write-tests), tests are run against all 40+ services so we define our tests as reusable functions that can be called in any service environment.

Jest is set up to detect files with the naming `(amp|canonical).test.js` and run any tests that are inside of them. This is where we can import and call the above mentioned test functions. To clarify, `amp.test.js` files run the tests on the AMP platform and `canonical.test.js` run the tests on the canonical platform.

An example of an `amp.test.js` test file that imports all AMP tests for a Pidgin article example http://localhost:7080/pidgin/23248703 looks like:

```js
/**
 * @service pidgin
 * @pathname /pidgin/23248703
 */

import runAmpTests from '../../../pages/articles/ampTests';

describe('AMP pidgin articles', runAmpTests);

```

The `canonical.test.js` equivalent looks like:

```js
/**
 * @service pidgin
 * @pathname /pidgin/23248703
 */

import runCanonicalTests from '../../../pages/articles/canonicalTests';

describe('Canonical pidgin articles', runCanonicalTests);

```

Writing and maintaining these test files for 40+ services and all their page types would be very difficult to do manually so these files are generated from a config file found in [`src/integration/utils/runTests/constants/services.js`](https://github.com/bbc/simorgh/blob/latest/src/integration/utils/runTests/constants/services.js). This config file contains all services and service variants with examples of urls for every page type to run tests against. Every time tests are run, the test files are regenerated from this config file to ensure they are up to date.

### How do the `amp.test.js` and `canonical.test.js` files work?
Each file contains 2 necessary [docblock pragmas](#what-is-a-docblock-pragma) - `@service` and `@pathname`.

The `@pathname` is the part of the url that is everything after `https://bbc.com` and in this example it is `/mundo/articles/ce42wzqr2mko`. If you visit `https://bbc.com/mundo/articles/ce42wzqr2mko` (**NB** this is the canonical url - for the AMP url just add `.amp` on the end) you will see this is a Mundo article page and it is what we are going to test.

The `@service` is parsed and added to the global scope of every test suite to serve tests that need to know the service they are running against, for example, tests that ensure the correct service's JavaScript bundled is loaded in the document. It also comes in handy to make exceptions for certain services in tests, for example, the Scotland service does not have a navigation bar, so we can wrap a conditional around such tests.

Before our tests run, a custom test environment [setup file](https://github.com/bbc/simorgh/tree/latest/src/integration/integrationTestEnvironment.js) parses the `@pathname` dockblock pragma and constructs the url. JSDOM then visits the url to get the DOM trees that we can use to run our tests against.

The benefit of abstracting the page rendering away from test files in a custom Jest environment is that it removes the test setup boilerplate from each test suite which would contain asynchronous handling of rendering the page. Also, since all the page rendering handling is done in one place, if we ever decide to switch to a different page rendering framework, but still want to use Jest as our test runner, then we can simply switch the JSDOM setup out of the custom test environment file and replace it with another page rendering framework. As long as we still pass a DOM implementation (`window.document` object) to the test files then our tests should still work as expected.

### Directory Structure

Tests functions for pages are located in the `src/app/integration/pages` directory within a directory for each page type:

```
├── pages
|  ├── articlePage
|  ├── errorPage
|  ├── frontPage
|  ├── mediaAssetPage
|  ├── onDemandRadioPage
|  ├── photoGalleryPage
|  ├── liveRadioPage
|  ├── onDemandRadioPage
```

Within each `page` directory are located the `ampTests`, `canonicalTests` and `crossPlatformTests` files.

```
└── liveRadioPage
   ├── ampTests.js
   ├── canonicalTests.js
   └── crossPlatformTests.js
```

All page types have some common UI and functionality. Tests for the common stuff are located in `src/app/integration/common`:

```
├── common
|  ├── SEO.js
|  ├── a11y.js
|  ├── analytics.amp.js
|  ├── analytics.canonical.js
|  ├── core.amp.js
|  ├── core.canonical.js
|  ├── footer.js
|  ├── header.js
|  ├── index.js
|  └── performance.js
```

As you can see, common UI and functionality includes header and footer UI, analytics reporting, SEO etc. We can import these in each page type's test file to run these tests.

## FAQs

### I already wrote unit tests for a component. Do I need to write an integration test for this component?

The answer is probably, yes. The purpose of an integration test is to test that the interaction between modules and React components work as expected.

A unit test only ensures that something works in isolation. Even if the units work well in isolation, you do not know if they work well together. For that we need integration tests.

### Can I just write integration tests and forget about unit tests since integration tests test the interaction between modules and the modules themselves

You might then think it makes sense to only write integration tests but there are downsides to integration tests. One downside is that integration tests are brittle. Because integration tests test a lot of moving parts there are a lot of things that can go wrong and finding where the problem lies can be like finding a needle in a haystack. Unit tests can help signal where we need to make a fix. It's also very difficult to cover all possible test cases of an application using only integration tests. It's much faster and easier to writes tests for various states of a React component with unit testing than it is with integration testing.

### What is JSDOM?

[JSDOM](https://github.com/jsdom/jsdom) is a JavaScript emulation of a web-browser. It can also be called a [headless browser](https://en.wikipedia.org/wiki/Headless_browser). Running tests in a JSDOM environment is substantially faster and less flaky than running tests in a real web browser however we sacrifice some environment accuracy. It can be a trade-off worth making for simple DOM querying tests.

### What is Jest?

[Jest](https://jestjs.io/en/) is a JavaScript library for creating, running, and structuring tests. We use Jest for our unit and integration tests.

### What is a docblock pragma?

A docblock pragma is a specially-formatted comment at the top of a test file. We can use docblock pragmas to alter the environment that tests run in.

### What is a snapshot?

This is a feature provided by Jest. It's not a snapshot of the graphical UI but a snapshot of a result that is typically returned from a function. This is often the HTML returned from DOM query selector e.g.

```js
it('should render the headline', () => {
  expect(document.querySelector('h1').outerHTML).toMatchSnapshot();
});
```

The above would create a file in a colocated `__snapshots__` directory

```
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`I can see the headline`] = `
<h1 id="content"
       "tabindex="-1"
>
  <span role="text">
    <span lang="en-GB">
      BBC News
    </span>
    ,
    Pidgin
    -
    Home
  </span>
</h1>
`;
```

It's recommended not to snapshot large parts of the DOM because this creates brittle tests i.e. these tests would break often because the DOM changes whenever someone changes something such as a React component's structure and styles, translation configs and feature toggles. It is better to have smaller and more focused snapshots. More info on this approach can be found in this article [Effective Snapshot Testing](https://kentcdodds.com/blog/effective-snapshot-testing).

An even better example of asserting a headline is on the page

```js
it('I can see the headline', () => {
  const h1El = document.querySelector('h1');

  expect(h1El).toBeInTheDocument(); // check the headline element is in the document
  expect(h1El.getAttribute('id')).toBe('content'); // check for the id attribute
  expect(h1El.getAttribute('tabindex')).toBe('-1'); // check for the tabindex attribute
  expect(h1El.textContent).toBeTruthy(); // check there is some text inside the element
  expect(h1El.textContent).toMatchSnapshot(); // snapshot the value so that we have a baseline to fail the test if it ever unexpectedly changes
});
```

This would produce the following snapshot:

```
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`I can see the headline`] = `BBC News, Pidgin - Home`;
```

### What is Cypress

Cypress is a JavaScript-based end-to-end testing framework. Our Cypress tests can be found [here](https://github.com/bbc/simorgh/tree/latest/cypress).

### My test is failing and I don't know why

Here are some possible answers:

- #### The thing I am testing is not in the DOM

  The feature you are trying to test may be rendered on the client side instead of on the server so does not exist in the DOM you are testing. We do not currently have client side rendering working with JSDOM but this is something we want to add in the future.

- #### Content in an iframe I want to test is not in the DOM

  This is another current limitation we have. We cannot test the contents that are rendered within an iframe. We can test that the iframe is there though. Testing the iframe `src` url may be sufficient. If this does not provide enough confidence then you should consider writing an end-to-end tests using another tool we use in Simorgh such as [Cypress](what-is-cypress).
