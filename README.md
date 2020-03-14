# Simorgh

[![Build Status](https://travis-ci.org/bbc/simorgh.svg?branch=latest)](https://travis-ci.org/bbc/simorgh)
[![Test Coverage](https://api.codeclimate.com/v1/badges/cbca275e184057982f27/test_coverage)](https://codeclimate.com/github/bbc/simorgh/test_coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/bbc/simorgh/badge.svg)](https://snyk.io/test/github/bbc/simorgh)
[![dependencies Status](https://david-dm.org/bbc/simorgh/status.svg)](https://david-dm.org/bbc/simorgh)
[![devDependencies Status](https://david-dm.org/bbc/simorgh/dev-status.svg)](https://david-dm.org/bbc/simorgh?type=dev)
[![Maintainability](https://api.codeclimate.com/v1/badges/cbca275e184057982f27/maintainability)](https://codeclimate.com/github/bbc/simorgh/maintainability)
[![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://bbc.github.io/simorgh/)

The BBC websites are being rebuilt from the bottom up as ReactJS based Single Page Applications, that will (eventually) also be fully fledged Progressive Web Apps. This application also builds Accelerated Mobile Pages for every regular HTML page that it renders.

Simorgh will be used across the BBC World Service News websites ([some are already live](https://github.com/bbc/simorgh/wiki/Simorgh-Pages)), with tens of millions of users, and growing very fast.

We lean heavily on the component library called [Psammead](https://github.com/bbc/psammead/) that we also maintain. This library is also open source and used even more widely across the BBC.

## Documentation index

Please familiarise yourself with our:

- [Code of conduct](https://github.com/bbc/simorgh/blob/latest/.github/CODE_OF_CONDUCT.md)
- [Code Standards](https://github.com/bbc/simorgh/blob/latest/docs/Code-Standards.md)
- [Contributing guidelines](https://github.com/bbc/simorgh/blob/latest/CONTRIBUTING.md)
- [Github Project Board Guide](https://github.com/bbc/simorgh/blob/latest/docs/Project-Board-Guide.md)
- [GPG Signing Guide](docs/GPG-Signing-Guide.md)
- [Primary README](https://github.com/bbc/simorgh/blob/latest/README.md) (you are here)

NB there is further documentation colocated with relevant code. The above list is an index of the top-level documentation of our repo.

## Simorgh Overview

### A High Level User Journey

#### The initial page load - Server Side Render (SSR)

A request to a BBC article (https://www.bbc.co.uk/news/articles/clldg965yzjo) is passed on to the Simorgh application from a proprietary routing and caching service (called Mozart).

The request matches a route in our express server using a regex match (`articleRegexPath` || `frontPageRegexPath`). If the URL matches the pre-defined regex pattern for an article or a front page we fetch some params from the route using the `getRouteProps` function. This returns the service, isAmp, route and match properties. Route is a react-router route that defines a method to fetch the initial JSON used to render the page and the react container in which to render i.e. `ArticleContainer`, this is typically called `getInitialData`

Once data is returned we pull the status code and pass all of this data as props to our main document using `renderDocument`.

The Document passes the URL, JSON data, BBC Origin, isAmp and the service to the main App container and the result is rendered to a string using reacts own `renderToString` method. This string is then passed to DocumentComponent as the main app along with the assets array, style tags (the output from styled components) and any scripts/links that need to be added to the head. This is then rendered to static HTML markup using reacts own `renderToStaticMarkup` and sent back to the user as static HTML. Included in this response are links to our JS bundles which a users device will download to bootstrap the single page application (SPA) for subsequent journeys.

Now that the raw HTML has been downloaded, the client-side JS file kicks in and hydrates the initial response with the client side application. During this process react uses the initial JSON payload (available on the global window object `SIMORGH_DATA`) to hydrate the original markup returned by ReactDOMServer. React expects that the rendered content is identical between the server and the client (This is why we send the initial JSON payload with the SSR page, so the hydration phase runs with the same data that the server render used).

#### Onward Journeys - Client Side Render (CSR)

Now that the SPA is bootstrapped on the users device, onward journeys to further Simorgh pages are captured by react-router and rendered entirely on the client.

Clicking on an onward journey triggers the `useEffect` hook in the main App container as the URL path has changed. This effect uses `getRouteProps` again to match the new path against a react-router route, gaining access to the; service and isAmp props, the react container to render and the `getInitialData` function.

The local state is now updated, setting `loading` to `true` and `data` to `null`. This update to state triggers the App container to re-render passing the state values as props to the main container, in this case either ArticlesContainer or FrontPageContainer. These containers compose a set of higher order components (HOC) and each one handles the values from a given props. Currently the loading prop is set to `true` so the `withLoading` HOC will return the loading component showing a visual loading state to the user.

During this time the App container has finished fetching the JSON payload for the onward journey and the state is updated again. Loading is now set to false and data is set to the returned JSON data.

The routes container is rendered again, this time loading is set to false so the `withData` HOC can run some validation against the JSON payload and return either an error component or the original page container e.g. ArticleContainer passing in the JSON data with the pageData prop.

### Rendering a Page

The JSON payload for an article consists of a number of Blocks. Each block is an object which represents an element on the page, this could be a Heading, an Image, a Paragraph etc. Each of these blocks has a block type and a block type will match up to a specific container in Simorgh e.g. blockType: image will match to the Image container.

The ArticleMain container will iterate over each JSON block, match it against its corresponding react container and pass the data via props. These containers are where the logic for rendering each block type sits. It is at this point where we use the installed frontend components from the Psammead component library. For example the Image container will import the Figure container, and Figure will import and use the psammead-image and the psammead-image-placeholder components. An image on an article will generally have a caption, so the Figure container will import the caption container which may include more frontend components from Psammead to render a caption on top of the image.

This process is repeated for each block within an article, ultimately rendering the main body of a news article using a combination of React containers for the business logic and React components for the frontend markup.

### A Page Render Lifecycle

Each render is passed through a set of HOC's (Higher Order Components) to enhance the page, these HOC's are;

- withVariant
- withContexts
- withPageWrapper
- withLoading
- withError
- withData

#### withVariant

The variant HOC ensures that services that have variants (e.g. `simp`, `lat`) always redirects to a url that renders the appropriate variant.

If a user navigates to a url without providing the variant, and variant is set in cookie, the cookie variant page is rendered. Otherwise, the default variant page is rendered

If a user navigates to a url with a variant, and variant is set in cookie, the cookie variant page is rendered. Otherwise, the requested variant page is rendered.

#### withContexts

The withContexts HOC is a wrapper that provides access to the different context providers available in the application. Any child component inside of these context providers has access to the context data via the useContexts hook.

#### withPageWrapper

The page wrapper HOC simply wraps the Article or FrontPage containers with a layout, at present we only have a single page layout. This layout includes the header, footer and context providers rendering the main body as a child between the header and the footer.

#### withLoading

The loading HOC checks the value of the loading props, if it is false the Article or FrontPage container is simply returned.

If loading is set to true, the Loading component is returned instead rendering a visual loading view for the user.

#### withError

The error HOC checks the error prop passed in, if error is set to null the Article or FrontPage container is simply returned.

If error is set to true the Error component is returned, giving the user a visual indication of the error e.g. a 500 error page.

#### withData

Assuming the other HOC's have returned the original Article or FrontPage container the data HOC will run some validation checks on the JSON data passed in via the data prop. If all of the checks are satisfied the ArticleContainer will be returned with a single `pageData` prop. This pageData props will house the JSON data to be rendered e.g. the Optimo blocks for a given article.

### Adding a new Page type

When adding a new page type there are several parts required.

#### 1) Fixture data should be added to `/data/{{service}}/{{pageType}}/`

- This should be done for each service using the page type.
- [Fixture data example](https://github.com/bbc/simorgh/blob/5de59c6207d46b11c3af68c58a620e250aff3a1a/data/igbo/frontpage/index.json)

#### 2) Serving the fixture data on local development

- The fixture data for the page type should be available on the same route as the page with a `.json` suffix
  - EG: The `localhost:7080/igbo.json` should have the data to build the index page `localhost:7080/igbo`
- To match the correct route we will need a new regex [here](https://github.com/bbc/simorgh/blob/5de59c6207d46b11c3af68c58a620e250aff3a1a/src/app/routes/regex/index.js)
- Then we need to add an Express route similar to [this](https://github.com/bbc/simorgh/blob/5de59c6207d46b11c3af68c58a620e250aff3a1a/src/server/index.jsx#L107-L113)

#### 3) Create a new container for the page type

- Similar to [this](https://github.com/bbc/simorgh/blob/latest/src/app/pages/FrontPage/index.jsx) we require a top level container that will act as the entry point for the page routing. Each page type should have its own container.
  - The container should render a `main` element with a [`flex-grow: 1;` css declaration](https://github.com/bbc/simorgh/blob/8e19f820ec0de4abd18a4d13e62dd5d843a064c0/src/app/containers/ArticleMain/index.jsx#L39), this is to ensure it grows to fill the space betwen the visual header and footer, the [root div](https://github.com/bbc/simorgh/blob/8e19f820ec0de4abd18a4d13e62dd5d843a064c0/src/server/Document/component.jsx#L31) using a [flexbox 'sticky footer' implementation](https://developer.mozilla.org/en-US/docs/Web/CSS/Layout_cookbook/Sticky_footers#Alternate_method).

#### 4) Add new pre-processing rules if required.

- If required for the new page type you can add pre-processing rules [here](https://github.com/bbc/simorgh/tree/latest/src/app/lib/utilities/preprocessor/rules). These are needed for use cases where we want to manipulate the data before it is received by the container for the page.
  - EG: On the articles routes [unique ID's](https://github.com/bbc/simorgh/blob/2db3185cd8c5c076bc004b03bb6e8dad62b0c109/src/app/routes/fetchPageData/article/index.js#L19) are added to each block in the payload

#### 5) Add a new route to the react router config

- This should be done for AMP and Canoical pages together
- [Route example](https://github.com/bbc/simorgh/blob/2db3185cd8c5c076bc004b03bb6e8dad62b0c109/src/app/routes/index.js#L22-L28)

#### 6) Add Cypress E2E tests for the new page type

- This requires config in `cypress/support/config/services.js` for every service (even if to set the new page type to undefined)
- If required bespoke tests for the page type should be added inside of `cypress/integration/pages/`
- If bespoke tests are added under `cypress/integration/pages/` you must ensure the e2e pipelines are updated to run the new spec [Test e2e Pipeline](https://github.com/bbc/simorgh/blob/latest/Jenkinsfile-e2e-test) & [Live e2e Pipeline](https://github.com/bbc/simorgh/blob/latest/Jenkinsfile-e2e)

NB: With this many steps it is suggested to have multiple PRs when adding a new page type as to not have a singular huge PR. However, if Cypress tests (#6) are not added in the same PR as the page routing (#5) they should immediately follow the page routing PR, ideally these should be handled in a single PR.

## Before Installation

Please read:
[CONTRIBUTING.md](https://github.com/bbc/simorgh/blob/latest/CONTRIBUTING.md)

## Installation

Install Node. [https://nodejs.org/en/](https://nodejs.org/en/). We use the version specified in `.nvmrc` and if you have a node version manager (nvm) you can run the following script to automatically change to the project supported version.

```
nvm use
```

Then you can run the following commands to install Simorgh

```
git clone git@github.com:bbc/simorgh.git
cd simorgh
npm install
```

## Local Development

To run this application locally, with hot-reloading, run

```
npm run dev
```

The application will start on [http://localhost:7080](http://localhost:7080).

Article pages are served at routes of the format `/news/articles/:id` where id is the asset ID generated by the Content Management System.

FYI: [Article explaining the BBC's use of ids in URL](https://www.smashingmagazine.com/2014/05/responsive-design-begins-with-the-url/)

These two News articles are available on the Test environment of our CMS, as well as locally, so are often used for testing:

- [http://localhost:7080/news/articles/c6v11qzyv8po](http://localhost:7080/news/articles/c6v11qzyv8po)
- [http://localhost:7080/persian/articles/c4vlle3q337o](http://localhost:7080/persian/articles/c4vlle3q337o).

We are also serving AMP HTML pages at the route `/news/articles/:id.amp` [https://www.ampproject.org](https://www.ampproject.org)

- [http://localhost:7080/news/articles/c6v11qzyv8po.amp](http://localhost:7080/news/articles/c6v11qzyv8po.amp)
- [http://localhost:7080/persian/articles/c4vlle3q337o.amp](http://localhost:7080/persian/articles/c4vlle3q337o.amp).

Services with variants can't be accessed using the format above, instead the variant must be provided in the URL.

- [http://localhost:7080/zhongwen/articles/c3xd4x9prgyo/simp](http://localhost:7080/zhongwen/articles/c3xd4x9prgyo/simp)
- [http://localhost:7080/zhongwen/articles/c3xd4x9prgyo/simp.amp](http://localhost:7080/zhongwen/articles/c3xd4x9prgyo/simp.amp).

### Front pages

World Service front pages are served in the format `/:service` where `service` represents a World Service site:

- [http://localhost:7080/igbo](http://localhost:7080/igbo)
- [http://localhost:7080/pidgin](http://localhost:7080/pidgin)

The World Service front pages follow the article format for AMP too, being available at `/:service.amp`:

- [http://localhost:7080/igbo.amp](http://localhost:7080/igbo.amp)
- [http://localhost:7080/pidgin.amp](http://localhost:7080/pidgin.amp)

Services with variants can't be accessed using the format above, instead the variant must be provided in the URL.

- [http://localhost:7080/zhongwen/simp](http://localhost:7080/zhongwen/simp)
- [http://localhost:7080/zhongwen/simp.amp](http://localhost:7080/zhongwen/simp.amp).

### Other page types

You can find other pages types by looking through our routes and their associates regexes, but we suggest you start with the above then have a look at the core of the application to understand and find the other routes.

### Storybook (UI Development Environment/Style Guide)

We use Storybook for developing components in isolation from the Simorgh Application. You can access this at [https://bbc.github.io/simorgh/](https://bbc.github.io/simorgh/)

To run locally `npm run storybook`, it will then be available at [http://localhost:9001/](http://localhost:9001/). Introduction to and documentation for Storybook is here: [https://storybook.js.org/basics/introduction/](https://storybook.js.org/basics/introduction/).

When viewing Video stories locally, make sure to use a BBC domain, as outlined in the [changing request location section](https://github.com/bbc/simorgh#changing-request-location). Video will not work in the hosted version of Storybook linked above for this reason.

We also use [Chromatic QA](https://docs.chromaticqa.com/) to run cross-browser testing on our stories.

Please also note that if you would like to see the components rendered with our fonts, you will need to force a repaint of the canvas. This is because our fonts all have the `font-display` property of `optional` or `swap` in accordance with the respective loading strategies here: https://ws-downloads.files.bbci.co.uk/fonts/index.html. The easiest way to force a repaint is just to move the divider between the preview window the and `Knobs` section or resize the browser window.

## Production build locally

To run this application locally with a production build, run:
`npm run build && npm run start`.

We use `npm run build` locally which bundles the application pointing at localhost for data and static assets.

## Using environment builds locally

This is mainly used for debugging `latest` using the TEST and LIVE environment bundles. Ensure that the bundles exist in the static asset location for the correct environment before starting to debug.

To run TEST bundles on localhost:

- In `envConfig/test.env` change the values of:
  - `LOG_DIR='/var/log/simorgh'` to `LOG_DIR='log'`
- Then run `rm -rf build && npm run build:test && npm run start`
- Visit a test article: http://localhost:7080/news/articles/c0g992jmmkko

To run LIVE bundles on localhost:

- In `envConfig/live.env` change the values of:
  - `LOG_DIR='/var/log/simorgh'` to `LOG_DIR='log'`
- Then run `rm -rf build && npm run build:live && npm run start`
- Visit a live article: http://localhost:7080/news/articles/c8xxl4l3dzeo

## Changing request location

Some features perform differently dependant on whether a user is located within the UK or internationally. You can explicitly request a specific version by accessing Simorgh via a specific localhost BBC domain:

- UK version: [http://localhost.bbc.co.uk:7080/news/articles/c0000000001o](http://localhost.bbc.co.uk:7080/news/articles/c0000000001o)
- International version: [http://localhost.bbc.com:7080/news/articles/c0000000001o](http://localhost.bbc.com:7080/news/articles/c0000000001o)

If these urls do not work, you may need to add a hosts file entry (`/etc/hosts` or `C:\Windows\System32\drivers\etc\hosts`):

```
127.0.0.1 localhost.bbc.co.uk
127.0.0.1 localhost.bbc.com
```

## Production build on CI

On deployment `make buildCi` is run in the CI environment which creates bundles for both the `test` and `live` environments. On the two environments the `.env.test` or `.env.live` files overwrite the `.env` file which is used to run the application with the correct bundles.

### Bundle analysis reports

Every run of `npm run build` will update the bundle analysis files in the repo. To view a breakdown of the bundle size, open the generated html report in a browser `./reports/webpackBundleReport.html` This is generated via `webpack-bundle-analyzer`. The data is also available as json `./reports/webpackBundleReport.json`.

## Tests

### Linting and unit tests

We have linting with the [Airbnb styleguide](https://github.com/airbnb/javascript/tree/master/react) and we use [Prettier](https://github.com/prettier/prettier) as a code formatter. They can be run with `npm run test:lint`.

We have [Jest](https://facebook.github.io/jest) unit tests that can be run with `npm run test:unit`.

`npm test` runs both sets of these.

### End-to-end tests

#### Main application

We use [Cypress](https://www.cypress.io/) for our end-to-end tests. To run the [smoke tests](https://github.com/bbc/simorgh/tree/latest/cypress/integration#how-our-cypress-tests-work) locally, run this single command:

```
npm run test:e2e
```

It will spin up a production server on port 7080 and run the Cypress tests against that.
To run the smoke tests interactively, run:

```
npm run test:e2e:interactive
```

This loads a user interface which easily allows for individual tests to be run alongside a visual stream of the browser, as the tests run.

#### Environment variables

There are several environment variables you can use with our test suite, which are:

| Envionment variable  | Effect                                                                                                        | Possible values                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| CYPRESS_ONLY_SERVICE | Restricts to running only the specified service                                                               | A single service i.e. `CYPRESS_ONLY_SERVICE=urdu` |
| CYPRESS_APP_ENV      | Runs the tests in a specific environment                                                                      | `test`, `local`, `live`                           |
| CYPRESS_SMOKE        | Runs only smoke tests if true                                                                                 | `true`, `false`                                   |
| CYPRESS_UK           | See [running e2es in the UK against Live](https://github.com/bbc/simorgh/#running-e2e-in-the-uk-against-live) | `true`, `false`                                   |
| CYPRESS_SKIP_EU      | See [running e2es outside EU](https://github.com/bbc/simorgh/#running-e2e-outside-eu)                         | `true`, `false`                                   |

These commands can be run in combination.

#### Full suite of tests

The default way to run the e2e suite aka `npm run test:e2e` or `npm run test:e2e:interactive` runs a subset of our tests, otherwise know as _smoke tests_. To run the full suite:

`CYPRESS_SMOKE=false npm run test:e2e`

#### Limiting scope of runs

Tests can be restricted to only run for a single service by specifying it using the `CYPRESS_ONLY_SERVICE` environment variable. For example:

```
CYPRESS_ONLY_SERVICE=urdu npm run test:e2e
```

To run only a particular spec it is necessary to invoke Cypress directly. First ensure Simorgh is already running in another tab and then run (for example, to only run article tests):

```
npx cypress run --spec cypress/integration/pages/articles/index.js
```

Further details on using the Cypress CLI can be found at https://docs.cypress.io/guides/guides/command-line.html

#### Running e2e in the UK against LIVE

**This affects developers based in the UK only (but may affect you if you're using a VPN routing through the UK)**

Cypress .visit() function is locked to visiting a single domain per test. This becomes problematic when you launch the e2e tests from within the UK, due to redirects from `.com` to `.co.uk`. By default cypress tests will run as if they were ran outside of the uk. In order to run these tests from the UK you have to pass in the `UK` Cypress environment variable to the tests. This will replace the URL endings to `.co.uk`, which will allow you to run these tests successfully.

Here is an example command:

```
CYPRESS_APP_ENV=test CYPRESS_UK=true CYPRESS_SMOKE=true npm run cypress
```

#### Running e2e outside EU

**This affects developers based out of the EU (but may affect you if you're using a VPN routing through a country not in the EU)**

Running Cypress tests outside the EU will not show the EU consent banners on AMP, and this may cause some tests to fail. Set `CYPRESS_SKIP_EU=true` to prevent these tests from running when outside the EU.

An example command will be:

```
CYPRESS_SKIP_EU=true npm run cypress:interactive
```

The following command runs both simorgh and cypress:

```
CYPRESS_APP_ENV=local CYPRESS_UK=true CYPRESS_SMOKE=true npm run test:e2e
```

CYPRESS_APP_ENV can also be set equal to 'test' and 'live'.
CYPRESS_SMOKE can be true or false. It is true by default and runs a specific subset of tests.

### Lighthouse Best Practice tests

We use [Lighthouse](https://github.com/googlechrome/lighthouse) to test the performance of our page. However these have been moved out of Simorgh down to our own internal CD processes. This allows us to run these tests on a more accurate depiction of Simorgh. You are free to run lighthouse on your own from your Chrome browser or use the Node Lighthouse CLI.

### Why is it called Simorgh?!

Named Simorgh after the Persian mythological bird. The Simorgh is the amalgam of many birds (and in some accounts other animals) into one.

Happily, a metaphor which seemed apt for offering all BBC articles in one solution is perhaps now even more appropriate as the application evolves to support more content types. It’s also a clear reference to the international nature of our teams, but also to the desire to ensure articles (and everything which has followed) works for users in all languages the BBC supports.

It is also a unique name which is practical and, more superficially, the bird is very pretty.
