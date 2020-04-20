This is where we write integration tests specifically for ensuring that all modules and React components within Simorgh and Psammead are working together to render a full page as expected.

These tests use the [Jest](#what-is-jest) test runner and operate in a [JSDOM](#what-is-jsdom) environment.

## Getting started

To run the tests locally:

```js
npm run test:integration
```

This will build and run the application that the tests will run against.

## How to write tests

We need to write tests for both our AMP and canonical platforms. There are tests that can be written to test both platforms (cross platform tests), some tests for canonical only, and some tests for AMP only.

#### Cross platform tests

For tests that can be run in both platforms, we should add these tests to a file called `crossPlatformTests.js`. An example of a cross platform test would be like

```js
export default () => {
  it('I can see the headline', () => {
    const headlineEl = document.getByText(headlineText);

    expect(headlineEl).toBeInTheDocument();
  });
};
```

#### AMP only tests

For tests that should be run only on the AMP platform, we should add these tests to a file called `ampTests.js`. An example of a cross platform test would be like

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

For tests that should be run only on the canonical platform, we should add these tests to a file called `canonicalTests.js`. An example of a cross platform test would be like

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

For Jest to run the tests in these files we need to create a `*(amp|canonical).test.js` file that will import and call the test functions. We use `amp.test.js` to run the tests on the AMP platform and `canonical.test.js` to run the tests on the canonical platform. For example a file name `amp.test.js` with the contents:

```js
/**
 * @service pidgin
 * @pathname /pidgin/23248703
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runAmpTests from '../ampTests';

describe(platform.toUpperCase(), () => {
  describe(pageType, () => {
    runCrossPlatformTests();
    runAmpTests();
  });
});
```

In the above example we import the cross platform tests and the AMP tests. We have also specified a pathname using a [docblock pragma](#what-is-a-docblock-pragma). The pathname is the part of the url that is everything after `https://bbc.com` and in this example it is `/mundo/articles/ce42wzqr2mko`. If you visit `https://bbc.com/mundo/articles/ce42wzqr2mko` (**NB** this is the canonical url - for the AMP url just add `.amp` on the end) you will see this is a Mundo article page and it is what we are going to test.

Before our tests run, the test environment [setup file](https://github.com/bbc/simorgh/tree/latest/src/integration/integrationTestEnvironment.js) parses the `pathname` dockblock pragma and constructs the url. JSDOM then visits the url to get the DOM trees that we can use to run our tests against.

Note we have also specified a `service` docblock pragma. The service is parsed and added to the global scope of every test file. This can come in handy for tests where you need to know the service. There are other useful variables added to the global scope:

- `pageType` - The page type which is parsed from the test file path.
- `service` - The service of the currently running page test.
- `document` - The `document` object of the current page. You can use this to query the DOM and assert the correct things are in the page.
- `platform` - The current platform (`amp` or `canonical`)

Tests for pages are located in the `src/app/integration/pages` directory within a directory for each page type:

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

within a page type directory we tell Jest where our test suites are by using the `.test.js` file extension, for example, `amp.test.js`, `canonical.test.js`. To test the `amharic` service we have created a directory specifically for this and located the AMP and canonical test files within.

```
└── liveRadioPage
   ├── amharic
   |  ├── amp.test.js
   |  └── canonical.test.js
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

## I already wrote unit tests for a component. Do I need to write an integration test for this component?

The answer is probably, yes. The purpose of an integration test is to test that the interaction between modules and React components work as expected.

A unit test only ensures that something works in isolation. Even if the units work well in isolation, you do not know if they work well together. For that we need integration tests.

## Can I just write integration tests and forget about unit tests since integration tests test the interaction between modules and the modules themselves

You might then think it makes sense to only write integration tests but there are downsides to integration tests. One downside is that integration tests are brittle. Because integration tests test a lot of moving parts there are a lot of things that can go wrong and finding where the problem lies can be like finding a needle in a haystack. Unit tests can help signal where we need to make a fix. It's also very difficult to cover all possible test cases of an application using only integration tests. It's much faster and easier to writes tests for various states of a React component with unit testing than it is with integration testing.

## What is JSDOM?

[JSDOM](https://github.com/jsdom/jsdom) is a JavaScript emulation of a web-browser. It can also be called a [headless browser](https://en.wikipedia.org/wiki/Headless_browser). Running tests in a JSDOM environment is substantially faster and less flaky than running tests in a real web browser however we sacrifice some environment accuracy. It can be a trade-off worth making for simple DOM querying tests.

## What is Jest?

[Jest](https://jestjs.io/en/) is a JavaScript library for creating, running, and structuring tests. We use Jest for our unit and integration tests.

## What is DOM Testing Library?

[DOM Testing Library](https://github.com/testing-library/dom-testing-library) provides testing utilities that encourage good testing practices. It provides methods to query the DOM for nodes in a way that's similar to how the user finds elements on the page. All queries available can be found [here](https://testing-library.com/docs/dom-testing-library/api-queries).

## What is a docblock pragma?

A docblock pragma is a specially-formatted comment at the top of a test file. We can use docblock pragmas to alter the environment that tests run in.

## What is the Given-When-Then stuff all about?

The Given-When-Then formula is a template intended to guide the writing of acceptance tests for a user story.

- (Given) some context
- (When) some action is carried out
- (Then) a particular set of consequences can be observed

An example:

- Given I am on a Mundo article canonical page
- When I am using the website
- Then I can see an image with a caption.

## What is a snapshot?

This is a feature provided by Jest. It's not a snapshot of the graphical UI but a snapshot of the underlying DOM tree that is used to catch unexpected changes.

## What is Cypress

Cypress is a JavaScript-based end-to-end testing framework. Our Cypress tests can be found [here](https://github.com/bbc/simorgh/tree/latest/cypress).

## My test is failing and I don't know why

Here are some possible answers:

- ### The thing I am testing is not in the DOM

  The feature you are trying to test may be rendered on the client side instead of on the server so does not exist in the DOM you are testing. We do not currently have client side rendering working with JSDOM but this is something we want to add in the future.

- ### Content in an iframe I want to test is not in the DOM

  This is another current limitation we have. We cannot test the contents that are rendered within an iframe. We can test that the iframe is there though. Testing the iframe `src` url may be sufficient. If this does not provide enough confidence then you should consider writing an end-to-end tests using another tool we use in Simorgh such as [Cypress](what-is-cypress).

- ### The `getByText` query is not working

  getByText has a limitation where it cannot select text that spans mulitple elements. In these cases you can use `getByTextMultiElement`

- ### The `getByAltText` query is not working for AMP

  AMP has some custom components which are transformed by the AMP library on the client side into something that the web-browser can understand. One of these components is `amp-img`. The problem is the `getByAltText` queries the DOM for an `img` element with an `alt` attribute that matches the provided alt-text so the `amp-img` element is not picked up. The current solution is to use `document.querySelector` and search for the `amp-img` element combined with an attribute selector, for example:

  ```js
  const image = amp.document.querySelector(`amp-img[alt="${imageAltText}"]`);
  ```

  This could be another issue that will be fixed by client side rendering with JSDOM.
