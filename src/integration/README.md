This is where we write integration tests specifically for ensuring that all modules and React components within Simorgh and Psammead are working together to render a full page as expected.

These tests use the [Jest](#what-is-jest) test runner and operate in a [JSDOM](#what-is-jsdom) environment.

## Getting started

To run the tests locally:

```js
npm run test:integration
```

This will build and run the application that the tests will run against.

## How to write tests

An example of a test that would check a headline renders in the document on both AMP and canonical platforms would look like this:

```js
/**
 * @pathname /mundo/articles/ce42wzqr2mko
 */

[amp, canonical].forEach(page => {
  it('I can see the headline', () => {
    const headlineEl = page.getByText(headlineText);

    expect(headlineEl).toBeInTheDocument();
  });
});
```

In the above example we have specified a pathname using a [docblock pragma](#what-is-a-docblock-pragma). The pathname is the part of the url that is everything after `https://bbc.com` and in this example it is `/mundo/articles/ce42wzqr2mko`. If you visit `https://bbc.com/mundo/articles/ce42wzqr2mko` you will see this is a Mundo article page and it is what we are going to test.

Before our tests run, the test environment [setup file](https://github.com/bbc/simorgh/tree/latest/src/integration/integrationTestEnvironment.js) parses the `pathname` dockblock pragma and constructs both an AMP and canonical url. JSDOM then visits both urls to get the DOM trees that we can use to run our tests against. The AMP DOM and the canonical DOM is available on the global scope across all files used in a test. We can run the same test for AMP and canonical by putting them in an array and iterating on the array. If we only want to run a test on a single platform, for example amp, then we can just do:

```js
/**
 * @pathname /mundo/articles/ce42wzqr2mko
 */

it('I can see the headline', () => {
  const headlineEl = canonical.getByText(headlineText);

  expect(headlineEl).toBeInTheDocument();
});
```

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

within a page type directory we tell Jest where our test suites are by using the `.test.js` file extension, for example, `amharic.test.js`, `korean.test.js` where we are testing the Amharic and Korean live radio pages respectively.

```
└── liveRadioPage
   ├── __snapshots__
   |  ├── amharic.test.js.snap
   |  └── korean.test.js.snap
   ├── amharic.test.js
   ├── korean.test.js
   ├── user.amp.js
   ├── user.canonical.js
   └── user.js
```

Each page type's test file will have specific user tests, for example in the context of a live radio page, we want to test that a user can see a headline, a description of the live radio stream and a media player.

We define these tests inside of the `user.js` file and import them into each page type test file `amharic.test.js`, `korean.test.js`. Sometimes the UI or UX is slightly different between AMP and canonical. In these cases we have different files for each - `user.amp.js` and `user.canonical.js`. User tests should be focussed on testing things on the page that a user can see or interact with. They should not contain anything to do with SEO, analytics or checking scripts are in the page.

User tests are the most important tests we write because this is who we build software for. We should also consider a11y tests in our user tests.

We can make use of DOM Testing Library to write better user tests. The main utilities it provides involve querying the DOM in a way that's similar to how the user finds elements on the page e.g. `getByText('This is the headline text')`. This is preferred over something like `document.querySelector('.headline')`. This also makes our user tests more maintainable in the long run as refactors to our components, for example a class name change, don't break our tests and slow us down. When testing something like SEO, something that you cannot see or interact with, then `document.querySelector` is the go to method for querying the DOM.

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
|  ├── performance.js
|  └── snapshot.js
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
