# Integration tests

This is where we write integration tests specifically for ensuring that all modules and React components within Simorgh and Psammead are working together to render a full page as expected.

These tests use the Jest test runner and operate in a JSDOM environment.

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

Before our tests run, JSDOM constructs an AMP url and a canonical url and then visits both of them to get the DOM tree that we can use to run our tests against. The AMP and canonical DOM is available on the global scope as you can see in the above example. We can run the same test for AMP and canonical by putting them in an array and iterating on the array. If we only want to run a test on a single platform, for example canonical, then we can just do:

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

within a page type directory we tell Jest where our test suites are by using the `.test.js` file extension, for example, `amharic.test.js`, `korean.test.js` where we are testing an Amharic and a Korean live radio pages respectively.

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

We can make use of DOM Testing Library to write better user tests. The main utilities it provides involve querying the DOM in a way that's similar to how the user finds elements on the page e.g. `getByText('This is the headline text')`. This is preferred over something like `document.querySelector('.headline')`. This also makes our user tests more maintainable in the long run as refactors to our components, for example a class name change, don't break our tests and slow us down. When testing something like SEO, something that you cannot see or interact with, then `document.querySelector` is the preferred method of querying the DOM.

All page types have some common UI and functionality. Tests for the common stuff are located in `src/app/integration/pages/common`:

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

## What is JSDOM?

[JSDOM](https://github.com/jsdom/jsdom) is a JavaScript emulation of a web-browser. It can also be called a [headless browser](https://en.wikipedia.org/wiki/Headless_browser). Running tests in a JSDOM environment is substantially faster than running tests in a real web browser however we sacrifice some environment accuracy. It can a trade-off worth making for simple DOM querying tests.

## What is Jest?

[Jest](https://jestjs.io/en/) is a JavaScript library for creating, running, and structuring tests. We use Jest for our unit and integration tests.

## What is DOM Testing Library?

[DOM Testing Library](https://github.com/testing-library/dom-testing-library) provides testing utilities that encourage good testing practices. It provides methods to query the DOM for nodes in a way that's similar to how the user finds elements on the page. All queries available an be found [here](https://testing-library.com/docs/dom-testing-library/api-queries)

## What is a docblock pragma?

A docblock pragma is a specially-formatted comment at the top of a test file. We can use docblock pragmas to alter the environment that tests run in.

## What is the Given-When-Then stuff all about?

The Given-When-Then formula is a template intended to guide the writing of acceptance tests for a user story.

(Given) some context
(When) some action is carried out
(Then) a particular set of observable consequences should obtain

An example:

Given I am on a Mundo article canonical page
When I am using the website
Then I can see an image with a caption.

## What is a snapshot?

This is a feature provided by Jest. It's not a snapshot of the graphical UI but a snapshot of the underlying DOM tree that is used to catch unexpected changes.

## My test is failing and I don't know why

Here are some possible answers:

### The thing I am testing is not in the DOM

The feature you are trying to test may be rendered on the client side instead of on the server so does not exist in the DOM you are testing. We do not currently have client side rendering working with JSDOM but this is something we want to add in the future.

### getByText not working

getByText has a limitation where it cannot select text that spans mulitple elements. In these cases you can use `getByTextMultiElement`
